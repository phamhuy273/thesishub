import React from 'react';
import { STATUS_CONFIG } from '../constants/status';

export default function TopicCard({ topic, onApply, onApprove }) {
  const status = STATUS_CONFIG[topic.trangThai] || { text: topic.trangThai, color: '#475569', bg: '#f1f5f9', border: '#cbd5e1' };
  const memberCount = (topic.danhSachSinhVien || []).length;

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            {topic.maDeTai}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: status.color,
              background: status.bg,
              border: `1px solid ${status.border}`,
              padding: '0.2rem 0.6rem',
              borderRadius: '4px'
            }}
          >
            {status.text}
          </span>
        </div>

        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4, color: '#0f172a' }}>
          {topic.tenDeTai}
        </h3>

        <p style={{ margin: '0 0 1rem 0', fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5 }}>
          {topic.moTa || 'Chưa có thông tin mô tả chi tiết'}
        </p>

        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #f1f5f9', marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.4rem', color: '#475569' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Cán bộ hướng dẫn:</span>{' '}
            {topic.giangVienHuongDan?.hoTen || 'Chưa phân công'} ({topic.giangVienHuongDan?.maGiangVien || 'GV'})
          </div>

          <div style={{ color: '#475569' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Sinh viên thực hiện:</span>
              <span style={{ fontSize: '0.75rem', color: memberCount >= 2 ? '#15803d' : '#854d0e', fontWeight: 600 }}>
                {memberCount}/2 sinh viên
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {(topic.danhSachSinhVien || []).map((sv) => (
                <span
                  key={sv.maSoSinhVien}
                  style={{
                    background: '#fff',
                    border: '1px solid #cbd5e1',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    color: '#0f172a'
                  }}
                >
                  {sv.hoTen} ({sv.maSoSinhVien})
                </span>
              ))}
              {topic.dangTimDongDoi && memberCount < 2 && (
                <span
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    color: '#047857',
                    fontWeight: 500
                  }}
                >
                  Đang tìm 1 thành viên ghép đội
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
        {topic.dangTimDongDoi && memberCount < 2 && (
          <button
            onClick={() => onApply(topic)}
            style={{
              flex: 1,
              background: '#059669',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Ứng tuyển ghép đội
          </button>
        )}

        <button
          onClick={() => onApprove(topic)}
          style={{
            flex: topic.dangTimDongDoi && memberCount < 2 ? '0 0 auto' : 1,
            background: '#fff',
            color: '#334155',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '0.45rem 0.75rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Thẩm định & Phê duyệt
        </button>
      </div>
    </div>
  );
}
