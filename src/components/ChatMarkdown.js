import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const defaultTarget = (href) => {
  if (!href || !/^https?:\/\//i.test(href)) return undefined;
  try {
    const u = new URL(href);
    return u.origin !== window.location.origin ? '_blank' : undefined;
  } catch {
    return undefined;
  }
};

const components = {
  a: ({ href, title, children }) => (
    <a
      href={href}
      title={title}
      target={defaultTarget(href)}
      rel={defaultTarget(href) === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
};

const ChatMarkdown = ({ children }) => {
  const text = typeof children === 'string' ? children : '';
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {text}
    </ReactMarkdown>
  );
};

export default ChatMarkdown;
