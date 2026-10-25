import React from 'react';

export default function InstructorsPage({ giangVienList, deTaiList }) {
  const gvStats = giangVienList.map((gv) => {
    const matchedTopics = deTaiList.filter((d) => d.giangVienHuongDan?.maGiangVien === gv.maGiangVien);
    const currentCount = matchedTopics.reduce((acc, curr) => acc + (curr.danhSachSinhVien || []).length, 0);
    const maxCount = gv.soLuongSinhVienToiDa || 10;
    const isFull = currentCount >= maxCount;
    const ratio = Math.min(100, Math.round((currentCount / maxCount) * 100));

    let barColor = '#15803d';
    if (ratio >= 100) {
      barColor = '#b91c1c';
    } else if (ratio >= 70) {
      barColor = '#b45309';
    }

    return {
      ...gv,
      currentCount,
      maxCount,
      isFull,
      ratio,
      barColor
    };
  });

  const totalInstructors = gvStats.length;
  const totalQuota = gvStats.reduce((sum, g) => sum + g.maxCount, 0);
  const totalEnrolled = gvStats.reduce((sum, g) => sum + g.currentCount, 0);
  const totalAvailable = Math.max(0, totalQuota - totalEnrolled);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text)' }}>
          Hạn ngạch giảng viên
        </h2>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
          Theo dõi số lượng sinh viên tiếp nhận hướng dẫn đồ án tốt nghiệp của từng cán bộ theo quy chế đào tạo.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <div className="stat-card">
          <div className="stat-label">Tổng giảng viên</div>
          <div className="stat-value">{totalInstructors}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tổng chỉ tiêu</div>
          <div className="stat-value">{totalQuota}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Đã tiếp nhận</div>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>{totalEnrolled}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Chỉ tiêu còn trống</div>
          <div className="stat-value" style={{ color: '#15803d' }}>{totalAvailable}</div>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Mã GV</th>
              <th>Họ và tên cán bộ</th>
              <th>Email công vụ</th>
              <th style={{ minWidth: '220px' }}>Hạn ngạch tiếp nhận</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {gvStats.map((gv) => {
              const initialLetter = (gv.hoTen || 'G').split(' ').pop().charAt(0);

              return (
                <tr key={gv.maGiangVien}>
                  <td>
                    <span className="code-pill">{gv.maGiangVien}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '999px',
                          background: 'var(--primary-soft)',
                          color: 'var(--primary)',
                          fontWeight: 700,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {initialLetter}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{gv.hoTen}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{gv.email}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${gv.ratio}%`,
                            background: gv.barColor,
                            borderRadius: '999px',
                            transition: 'width .3s ease'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--text)', whiteSpace: 'nowrap', minWidth: '85px' }}>
                        <strong>{gv.currentCount}</strong> / {gv.maxCount} SV
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: gv.isFull ? '#fef2f2' : '#f0fdf4',
                        color: gv.isFull ? '#b91c1c' : '#15803d',
                        border: `1px solid ${gv.isFull ? '#fecaca' : '#bbf7d0'}`
                      }}
                    >
                      {gv.isFull ? 'Đã đủ chỉ tiêu' : 'Còn tiếp nhận'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
