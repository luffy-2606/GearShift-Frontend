import React from 'react';
import './PageLoadSkeleton.css';

const defaultMessages = {
  dashboard: 'Syncing your garage, shops, and service history',
  list: 'Loading results',
  analytics: 'Crunching cost insights and trends',
  table: 'Loading data',
  minimal: 'Loading your session',
  'auth-card': 'Completing sign-in',
  'inline-timeline': 'Loading service history',
  compact: 'Loading'
};

function Footer({ message, variant }) {
  const text = message || defaultMessages[variant] || 'Loading';
  return (
    <div className="page-load-skeleton__footer">
      <span className="page-load-skeleton__dot" aria-hidden />
      <span>{text}</span>
    </div>
  );
}

function DashboardBody({ showFooter, message }) {
  return (
    <div className="page-load-skeleton__inner page-load-skeleton__inner--dashboard">
      <div className="page-load-skeleton__hero">
        <div className="page-load-skeleton__hero-text">
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--sm" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--lg" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--md" />
          <div
            className="page-load-skeleton__shimmer page-load-skeleton__line--md"
            style={{ maxWidth: 400, opacity: 0.7 }}
          />
        </div>
        <div className="page-load-skeleton__stats">
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
        </div>
      </div>
      <div className="page-load-skeleton__cards">
        <div className="page-load-skeleton__shimmer page-load-skeleton__card" />
        <div className="page-load-skeleton__shimmer page-load-skeleton__card" />
      </div>
      <div className="page-load-skeleton__shimmer page-load-skeleton__row" />
      <div
        className="page-load-skeleton__shimmer page-load-skeleton__row"
        style={{ maxWidth: '85%', margin: '0 auto' }}
      />
      {showFooter ? <Footer message={message} variant="dashboard" /> : null}
    </div>
  );
}

function ListBody({ message }) {
  return (
    <div className="page-load-skeleton__inner">
      <div className="page-load-skeleton__hero">
        <div className="page-load-skeleton__hero-text">
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--sm" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--lg" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--md" />
        </div>
        <div className="page-load-skeleton__stats">
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
        </div>
      </div>
      <div className="page-load-skeleton__filters">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="page-load-skeleton__shimmer page-load-skeleton__pill" />
        ))}
      </div>
      <div className="page-load-skeleton__grid-list">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="page-load-skeleton__shimmer page-load-skeleton__card page-load-skeleton__card--tall" />
        ))}
      </div>
      <Footer message={message} variant="list" />
    </div>
  );
}

function AnalyticsBody({ message }) {
  return (
    <div className="page-load-skeleton__inner">
      <div className="page-load-skeleton__hero">
        <div className="page-load-skeleton__hero-text">
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--sm" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--lg" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__line--md" />
        </div>
        <div className="page-load-skeleton__stats">
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__stat" />
        </div>
      </div>
      <div className="page-load-skeleton__tabs">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="page-load-skeleton__shimmer page-load-skeleton__tab" />
        ))}
      </div>
      <div className="page-load-skeleton__cards">
        <div className="page-load-skeleton__shimmer page-load-skeleton__card" />
        <div className="page-load-skeleton__shimmer page-load-skeleton__card" />
        <div className="page-load-skeleton__shimmer page-load-skeleton__card" />
      </div>
      <div className="page-load-skeleton__shimmer page-load-skeleton__row" />
      <Footer message={message} variant="analytics" />
    </div>
  );
}

function TableBody({ message }) {
  return (
    <div className="page-load-skeleton__inner" style={{ minHeight: 400, padding: '24px 0' }}>
      <div className="page-load-skeleton__table-toolbar">
        <div className="page-load-skeleton__shimmer page-load-skeleton__table-search" />
        <div className="page-load-skeleton__shimmer page-load-skeleton__table-btn" />
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="page-load-skeleton__shimmer page-load-skeleton__table-row" />
      ))}
      <div style={{ marginTop: 16, fontSize: 13, color: 'var(--gray-500, #6b7280)' }}>{message || defaultMessages.table}</div>
    </div>
  );
}

function MinimalBody({ message }) {
  return (
    <div className="page-load-skeleton__minimal" role="status" aria-label={message || defaultMessages.minimal}>
      <div className="page-load-skeleton__shimmer page-load-skeleton__line--lg" style={{ width: '100%', maxWidth: 200, margin: '0 auto' }} />
      <div className="page-load-skeleton__shimmer page-load-skeleton__line--md" style={{ maxWidth: 280, margin: '0 auto' }} />
      <div className="page-load-skeleton__shimmer page-load-skeleton__line--md" style={{ maxWidth: 240, margin: '0 auto', opacity: 0.75 }} />
      <div className="page-load-skeleton__minimal-footer">{message || defaultMessages.minimal}</div>
    </div>
  );
}

function AuthCardBody({ message }) {
  return (
    <div className="page-load-skeleton__auth" role="status" aria-label={message || defaultMessages['auth-card']}>
      <div className="page-load-skeleton__shimmer page-load-skeleton__auth-title" />
      <div className="page-load-skeleton__shimmer page-load-skeleton__auth-line" />
      <div className="page-load-skeleton__shimmer page-load-skeleton__auth-line" style={{ width: '75%', opacity: 0.8 }} />
      <div className="page-load-skeleton__minimal-footer" style={{ marginTop: 8 }}>
        {message || defaultMessages['auth-card']}
      </div>
    </div>
  );
}

function InlineTimelineBody() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="page-load-skeleton__timeline-row">
          <div className="page-load-skeleton__shimmer page-load-skeleton__timeline-dot" />
          <div className="page-load-skeleton__shimmer page-load-skeleton__timeline-card" />
        </div>
      ))}
    </>
  );
}

function CompactBody({ message }) {
  return (
    <div className="page-load-skeleton__compact">
      {[1, 2, 3].map((i) => (
        <div key={i} className="page-load-skeleton__shimmer page-load-skeleton__compact-row" />
      ))}
      {message ? (
        <div className="page-load-skeleton__minimal-footer" style={{ textAlign: 'left', marginTop: 4 }}>
          {message}
        </div>
      ) : null}
    </div>
  );
}

/**
 * @param {'dashboard' | 'list' | 'analytics' | 'table' | 'minimal' | 'auth-card' | 'inline-timeline' | 'compact'} variant
 * @param {'dark' | 'light'} tone — light shimmer for admin / light surfaces
 */
export function PageLoadSkeleton({
  variant = 'dashboard',
  message,
  tone = 'dark',
  className = '',
  showFooter = true,
  ariaLabel
}) {
  const rootClass = [
    'page-load-skeleton',
    tone === 'light' ? 'page-load-skeleton--light' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const label =
    ariaLabel || message || defaultMessages[variant] || 'Loading';

  let body;
  switch (variant) {
    case 'list':
      body = <ListBody message={message} />;
      break;
    case 'analytics':
      body = <AnalyticsBody message={message} />;
      break;
    case 'table':
      body = <TableBody message={message} />;
      break;
    case 'minimal':
      body = <MinimalBody message={message} />;
      break;
    case 'auth-card':
      body = <AuthCardBody message={message} />;
      break;
    case 'inline-timeline':
      body = <InlineTimelineBody />;
      break;
    case 'compact':
      body = <CompactBody message={message} />;
      break;
    case 'dashboard':
    default:
      body = <DashboardBody showFooter={showFooter} message={message} />;
  }

  if (variant === 'inline-timeline') {
    return (
      <div
        className={`${rootClass} page-load-skeleton--inline`.trim()}
        aria-busy="true"
        aria-label={label}
        role="status"
      >
        {body}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={rootClass} aria-busy="true" aria-label={label} role="status">
        {body}
      </div>
    );
  }

  if (variant === 'minimal' || variant === 'auth-card') {
    return (
      <div className={rootClass} aria-busy="true" aria-label={label}>
        {body}
      </div>
    );
  }

  return (
    <div className={rootClass} aria-busy="true" aria-label={label}>
      {body}
    </div>
  );
}

export default PageLoadSkeleton;
