import React from 'react';

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14l3-3" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function RegulationsPage({ onNavigate }) {
  const handleNav = (tab, filter) => {
    if (typeof onNavigate === 'function') {
      onNavigate(tab, filter);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text)' }}>
          Quy chế & Bất biến hệ thống
        </h2>
        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-muted)' }}>
          Những quy định hệ thống tự động kiểm tra khi nộp đề xuất, ghép đội và duyệt đề tài.
        </p>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          (Bất biến toàn vẹn mô hình miền · Domain Invariants)
        </span>
      </div>

      <div className="rules">
        <div className="rule">
          <div className="rule-head">
            <div className="rule-icon">
              <UsersIcon />
            </div>
            <div>
              <span className="code-pill" style={{ marginBottom: '4px' }}>BR-01</span>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                Quy mô nhóm nghiên cứu
              </div>
            </div>
          </div>

          <div className="rule-key">
            Tối đa 2 sinh viên
          </div>

          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Mỗi đề tài Khóa luận tốt nghiệp chỉ được tối đa 02 sinh viên cùng thực hiện. Khi đủ 02 thành viên, hệ thống tự động khóa tính năng tìm đồng đội.
          </p>

          <button
            onClick={() => handleNav('topics', 'MATCHMAKING')}
            className="rule-link"
          >
            Xem trong hệ thống →
          </button>
        </div>

        <div className="rule">
          <div className="rule-head">
            <div className="rule-icon">
              <GaugeIcon />
            </div>
            <div>
              <span className="code-pill" style={{ marginBottom: '4px' }}>BR-02</span>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                Hạn mức của Giảng viên
              </div>
            </div>
          </div>

          <div className="rule-key">
            Hạn ngạch N = 10 SV
          </div>

          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Mỗi giảng viên chỉ được hướng dẫn tối đa N sinh viên (mặc định N = 10) trong một học kỳ để bảo đảm chất lượng cố vấn học thuật.
          </p>

          <button
            onClick={() => handleNav('instructors')}
            className="rule-link"
          >
            Xem trong hệ thống →
          </button>
        </div>

        <div className="rule">
          <div className="rule-head">
            <div className="rule-icon">
              <ShieldCheckIcon />
            </div>
            <div>
              <span className="code-pill" style={{ marginBottom: '4px' }}>BR-03</span>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                Quy trình thẩm định 2 cấp
              </div>
            </div>
          </div>

          <div className="rule-key">
            Quy trình 2 cấp độc lập
          </div>

          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Đề xuất đề tài bắt buộc phải được Giảng viên hướng dẫn thẩm định đồng ý trước khi chuyển tiếp lên Trưởng bộ môn phê duyệt chính thức.
          </p>

          <button
            onClick={() => handleNav('topics', 'PENDING_GV')}
            className="rule-link"
          >
            Xem trong hệ thống →
          </button>
        </div>

        <div className="rule">
          <div className="rule-head">
            <div className="rule-icon">
              <LockIcon />
            </div>
            <div>
              <span className="code-pill" style={{ marginBottom: '4px' }}>BR-04</span>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                Toàn vẹn hồ sơ đề tài
              </div>
            </div>
          </div>

          <div className="rule-key">
            1 đề tài / học kỳ
          </div>

          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Sinh viên đã có đề tài được phê duyệt không được phép nộp đề xuất mới hoặc tham gia nhóm đề tài khác trong cùng một học kỳ.
          </p>

          <button
            onClick={() => handleNav('topics', 'ALL')}
            className="rule-link"
          >
            Xem trong hệ thống →
          </button>
        </div>
      </div>

      <div className="flow-container">
        <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>
          Sơ đồ chu trình xét duyệt đồ án tốt nghiệp (Minh họa BR-03)
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
          Hồ sơ đề tài bắt buộc trải qua hai cấp thẩm định độc lập theo thứ tự tuần tự trước khi đủ điều kiện ra Hội đồng bảo vệ.
        </p>

        <div className="flow">
          <span
            className="flow-step"
            style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}
          >
            1. Nộp đề xuất đề tài
          </span>

          <span className="flow-arrow">→</span>

          <span
            className="flow-step"
            style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}
          >
            2. Chờ GV thẩm định
          </span>

          <span className="flow-arrow">→</span>

          <span
            className="flow-step"
            style={{ background: '#ecfeff', color: '#0e7490', border: '1px solid #a5f3fc' }}
          >
            3. Chờ Bộ môn duyệt
          </span>

          <span className="flow-arrow">→</span>

          <span
            className="flow-step"
            style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
          >
            4. Được bảo vệ
          </span>
        </div>
      </div>
    </div>
  );
}
