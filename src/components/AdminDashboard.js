import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/apiClient';

const TABS = [
  { id: 'users',         label: 'Manage Users' },
  { id: 'reviews',       label: 'Moderate Reviews' },
  { id: 'posts',         label: 'Moderate Posts' },
  { id: 'announcements', label: 'Publish Announcements' },
  { id: 'audit',         label: 'View Audit Logs' },
];

const ROLES = ['user', 'mechanic', 'admin'];

const EMPTY_CREATE_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: 'user',
};

// ─── Manage Users ────

const ManageUsers = ({ currentAdminId }) => {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [message, setMessage]       = useState({ text: '', type: '' });
  const [roleEdits, setRoleEdits]   = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_CREATE_FORM);
  const [creating, setCreating]     = useState(false);
  const [createError, setCreateError] = useState('');
  const [search, setSearch]         = useState('');

  const flash = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3500);
  };

  const fetchUsers = useCallback(async () => {
    try {
      const res = await apiClient.get('/api/admin/users');
      setUsers(res.data);
      // pre-populate the role-edit dropdowns with each user's current role
      const roleMap = {};
      res.data.forEach(u => { roleMap[u.id] = u.role; });
      setRoleEdits(roleMap);
    } catch {
      flash('Error fetching users', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSuspend = async (userId) => {
    try {
      await apiClient.put(`/api/admin/users/${userId}/suspend`);
      flash('User suspended');
      fetchUsers();
    } catch {
      flash('Error suspending user', 'error');
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await apiClient.put(`/api/admin/users/${userId}/reactivate`);
      flash('User reactivated');
      fetchUsers();
    } catch {
      flash('Error reactivating user', 'error');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await apiClient.delete(`/api/admin/users/${userId}`);
      flash('User deleted');
      fetchUsers();
    } catch {
      flash('Error deleting user', 'error');
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setRoleEdits(prev => ({ ...prev, [userId]: newRole }));
  };

  const handleRoleUpdate = async (userId) => {
    try {
      await apiClient.put(`/api/admin/users/${userId}/role`, { role: roleEdits[userId] });
      flash('Role updated');
      fetchUsers();
    } catch {
      flash('Error updating role', 'error');
    }
  };

  const handleCreateChange = (e) => {
    setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (createError) setCreateError('');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    try {
      await apiClient.post('/api/admin/users', createForm);
      flash('User created successfully');
      setCreateForm(EMPTY_CREATE_FORM);
      setShowCreate(false);
      fetchUsers();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Error creating user');
    } finally {
      setCreating(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      u.email.toLowerCase().includes(q) ||
      (u.first_name + ' ' + u.last_name).toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <div className="admin-tab-empty">Loading users…</div>;
  }

  return (
    <div>
      {/* toolbar */}
      <div className="admin-tab-toolbar">
        <input
          className="admin-search"
          type="text"
          placeholder="Search by name, email or role…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary btn-small-pad"
          onClick={() => { setShowCreate(s => !s); setCreateError(''); }}
        >
          {showCreate ? 'Cancel' : '+ Create User'}
        </button>
      </div>

      {/* flash message */}
      {message.text && (
        <div className={`admin-flash admin-flash-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* create user form */}
      {showCreate && (
        <div className="admin-create-form">
          <h3>Create New User</h3>
          {createError && (
            <div className="admin-flash admin-flash-error">{createError}</div>
          )}
          <form onSubmit={handleCreateSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input
                  name="first_name"
                  value={createForm.first_name}
                  onChange={handleCreateChange}
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  name="last_name"
                  value={createForm.last_name}
                  onChange={handleCreateChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={createForm.email}
                onChange={handleCreateChange}
                placeholder="jane@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={createForm.password}
                onChange={handleCreateChange}
                placeholder="Min. 6 characters"
                minLength={6}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={createForm.role} onChange={handleCreateChange}>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="action-buttons" style={{ marginTop: 12 }}>
              <button type="submit" className="btn btn-primary btn-small-pad" disabled={creating}>
                {creating ? 'Creating…' : 'Create User'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-small-pad"
                onClick={() => { setShowCreate(false); setCreateForm(EMPTY_CREATE_FORM); setCreateError(''); }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* users table */}
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '32px 0' }}>
                  No users found.
                </td>
              </tr>
            )}
            {filteredUsers.map(u => {
              const uid = u.id;
              const isSelf = uid === currentAdminId;
              return (
                <tr key={uid}>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.email}</td>
                  <td>
                    <div className="role-edit-cell">
                      <select
                        value={roleEdits[uid] ?? u.role}
                        onChange={e => handleRoleChange(uid, e.target.value)}
                        disabled={isSelf}
                        className="role-select"
                      >
                        {ROLES.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {roleEdits[uid] !== u.role && (
                        <button
                          className="btn-small btn-role-save"
                          onClick={() => handleRoleUpdate(uid)}
                          title="Save role change"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${u.status}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      {u.status === 'active' ? (
                        <button
                          className="btn-small btn-warning"
                          onClick={() => handleSuspend(uid)}
                          disabled={isSelf}
                          title={isSelf ? 'Cannot suspend yourself' : ''}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          className="btn-small btn-success"
                          onClick={() => handleReactivate(uid)}
                        >
                          Reactivate
                        </button>
                      )}
                      <button
                        className="btn-small btn-danger"
                        onClick={() => handleDelete(uid)}
                        disabled={isSelf}
                        title={isSelf ? 'Cannot delete yourself' : ''}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="admin-table-count">{filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}</p>
    </div>
  );
};

// ─── Placeholder tab ────────────────────────────────────────────────────────

const ComingSoon = ({ title, description }) => (
  <div className="admin-tab-empty">
    <div className="admin-tab-empty-icon">🚧</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// ─── Admin Dashboard shell ───────────────────────────────────────────────────

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container">
      {/* header */}
      <div className="dashboard-header">
        <div>
          <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
          <span style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2, display: 'block' }}>
            /admin/dashboard
          </span>
        </div>
        <div className="user-info">
          <span>
            {user?.first_name} {user?.last_name}
            <span className="role-badge role-admin" style={{ marginLeft: 8 }}>admin</span>
          </span>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </div>

      {/* tab navigation */}
      <div className="admin-tabs">
        <nav className="admin-tab-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`admin-tab-btn${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* tab panels */}
        <div className="admin-tab-panel">
          <div className="admin-tab-panel-header">
            <h2>{TABS.find(t => t.id === activeTab)?.label}</h2>
          </div>

          {activeTab === 'users' && (
            <ManageUsers currentAdminId={user?.id} />
          )}

          {activeTab === 'reviews' && (
            <ComingSoon
              title="Moderate Reviews"
              description="Review moderation tools are coming soon. You'll be able to view and delete inappropriate reviews here."
            />
          )}

          {activeTab === 'posts' && (
            <ComingSoon
              title="Moderate Posts"
              description="Post moderation tools are coming soon. You'll be able to view and remove unwanted posts here."
            />
          )}

          {activeTab === 'announcements' && (
            <ComingSoon
              title="Publish Announcements"
              description="Announcement publishing tools are coming soon. You'll be able to create and broadcast platform-wide announcements here."
            />
          )}

          {activeTab === 'audit' && (
            <ComingSoon
              title="View Audit Logs"
              description="Audit log viewer is coming soon. You'll be able to track all admin actions and system events here."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
