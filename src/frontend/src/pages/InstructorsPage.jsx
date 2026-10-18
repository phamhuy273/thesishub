import React from 'react';

export default function InstructorsPage({ giangVienList, deTaiList }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 1.25rem 0' }}>
        Danh mục Giảng viên Hướng dẫn & Tình trạng Hạn mức
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '0.75rem', fontWeight: 600, color: '#475569' }}>Mã GV</th>
              <th style={{ padding: '0.75rem', fontWeight: 600, color: '#475569' }}>Họ và tên cán bộ</th>
              <th style={{ padding: '0.75rem', fontWeight: 600, color: '#475569' }}>Email công vụ</th>
              <th style={{ padding: '0.75rem', fontWeight: 600, color: '#475569' }}>Hạn ngạch tiếp nhận</th>
              <th style={{ padding: '0.75rem', fontWeight: 600, color: '#475569' }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {giangVienList.map((gv) => {
              const matchedTopics = deTaiList.filter((d) => d.giangVienHuongDan?.maGiangVien === gv.maGiangVien);
              const currentCount = matchedTopics.reduce((acc, curr) => acc + (curr.danhSachSinhVien || []).length, 0);
              const isFull = currentCount >= gv.soLuongSinhVienToiDa;

              return (
                <tr key={gv.maGiangVien} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{gv.maGiangVien}</td>
                  <td style={{ padding: '0.75rem' }}>{gv.hoTen}</td>
                  <td style={{ padding: '0.75rem', color: '#64748b' }}>{gv.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>{currentCount}</span> / {gv.soLuongSinhVienToiDa} sinh viên
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: isFull ? '#fee2e2' : '#dcfce7',
                        color: isFull ? '#991b1b' : '#166534'
                      }}
                    >
                      {isFull ? 'Hết chỉ tiêu' : 'Còn tiếp nhận'}
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
