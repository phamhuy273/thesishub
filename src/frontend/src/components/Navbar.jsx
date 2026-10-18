import React from 'react';

export default function Navbar({ activeTab, setActiveTab, onOpenCreateModal }) {
  return (
    <>
      <header style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#fff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0.85rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '34px', height: '34px', background: '#2563eb', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
              TH
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>ThesisHub</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hệ thống Quản lý Khóa luận Tốt nghiệp · ĐH Công nghệ Thông tin (UIT)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onOpenCreateModal}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + Nộp đề xuất mới
            </button>
          </div>
        </div>
      </header>

      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '2rem' }}>
          <button
            onClick={() => setActiveTab('topics')}
            style={{
              padding: '0.85rem 0',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'topics' ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === 'topics' ? '#2563eb' : '#64748b',
              fontWeight: activeTab === 'topics' ? 600 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Danh sách Đề tài
          </button>
          <button
            onClick={() => setActiveTab('instructors')}
            style={{
              padding: '0.85rem 0',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'instructors' ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === 'instructors' ? '#2563eb' : '#64748b',
              fontWeight: activeTab === 'instructors' ? 600 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Hạn ngạch Giảng viên
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            style={{
              padding: '0.85rem 0',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'regulations' ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === 'regulations' ? '#2563eb' : '#64748b',
              fontWeight: activeTab === 'regulations' ? 600 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Quy chế & Bất biến
          </button>
        </div>
      </div>
    </>
  );
}
