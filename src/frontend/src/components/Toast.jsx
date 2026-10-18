import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 9999,
        padding: '0.75rem 1.25rem',
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#fff',
        background: toast.isError ? '#dc2626' : '#059669',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {toast.message}
    </div>
  );
}
