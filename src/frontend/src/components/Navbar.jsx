import React from 'react';
import uitLogo from '../assets/uit-logo.png';

export default function Navbar({ activeTab, setActiveTab, onOpenCreateModal, currentRole, setCurrentRole }) {
  return (
    <>
      <header style={{ background: 'var(--header)', borderBottom: '1px solid #1e293b', color: '#fff', minHeight: '72px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%', padding: '0.6rem 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '8px', padding: '3px 6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <img
                src={uitLogo}
                alt="Logo UIT 20 Năm"
                style={{ height: '44px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#f8fafc' }}>ThesisHub</div>
              <div className="nav-subtitle" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hệ thống Quản lý & Xét duyệt Đồ án Tốt nghiệp · ĐH Công nghệ Thông tin (UIT)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '2px 8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginRight: '6px' }}>Vai trò:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                style={{
                  background: 'transparent',
                  color: '#f8fafc',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '4px 0'
                }}
              >
                <option value="student" style={{ background: '#0f172a', color: '#fff' }}>Sinh viên (SV01)</option>
                <option value="instructor" style={{ background: '#0f172a', color: '#fff' }}>GVHD (GV01)</option>
                <option value="department" style={{ background: '#0f172a', color: '#fff' }}>Trưởng bộ môn</option>
              </select>
            </div>

            {currentRole === 'student' && (
              <button
                onClick={onOpenCreateModal}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: '0.825rem' }}
              >
                + Nộp đề xuất mới
              </button>
            )}
          </div>
        </div>
      </header>

      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('topics')}
            className={`tab ${activeTab === 'topics' ? 'active' : ''}`}
          >
            Danh sách Đề tài
          </button>
          <button
            onClick={() => setActiveTab('instructors')}
            className={`tab ${activeTab === 'instructors' ? 'active' : ''}`}
          >
            Hạn ngạch Giảng viên
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`tab ${activeTab === 'regulations' ? 'active' : ''}`}
          >
            Quy chế & Bất biến
          </button>
        </div>
      </div>
    </>
  );
}
