import React from 'react';
import { STATUS_CONFIG } from '../constants/status';

export default function TopicCard({ topic, onApply, onApprove, onViewProgress, currentRole }) {
  const status = STATUS_CONFIG[topic.trangThai] || { text: topic.trangThai, color: '#475569', bg: '#f1f5f9', border: '#cbd5e1' };
  const memberCount = (topic.danhSachSinhVien || []).length;

  const canStudentApply = currentRole === 'student' && topic.dangTimDongDoi && memberCount < 2;
  const canInstructorReview = currentRole === 'instructor' && topic.trangThai === 'CHO_GV_DONG_Y';
  const canDepartmentApprove = currentRole === 'department' && topic.trangThai === 'CHO_BO_MON_DUYET';

  return (
    <div className="card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem' }}>
          <span className="code-pill">
            {topic.maDeTai}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: status.color,
              background: status.bg,
              border: `1px solid ${status.border}`,
              padding: '2px 8px',
              borderRadius: '999px',
              whiteSpace: 'nowrap'
            }}
          >
            {status.text}
          </span>
        </div>

        <h3 className="card-title">
          {topic.tenDeTai}
        </h3>

        <p className="card-desc" style={{ marginTop: '6px' }}>
          {topic.moTa || 'Chưa có thông tin mô tả chi tiết'}
        </p>

        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', border: '1px solid #f1f5f9', marginTop: '12px' }}>
          <div style={{ marginBottom: '8px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Cán bộ hướng dẫn:</span>
            <span>{topic.giangVienHuongDan?.hoTen || 'Chưa phân công'}</span>
            <span className="code-pill" style={{ fontSize: '11px', padding: '1px 6px' }}>
              {topic.giangVienHuongDan?.maGiangVien || 'GV'}
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Thành viên:</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                {memberCount}/2 sinh viên
              </span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div className="slots">
                <span className="slots-bar" style={{ width: `${(memberCount / 2) * 100}%` }}></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {(topic.danhSachSinhVien || []).map((sv) => (
                <span
                  key={sv.maSoSinhVien}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: 'var(--text)'
                  }}
                >
                  {sv.hoTen} ({sv.maSoSinhVien})
                </span>
              ))}

              {topic.dangTimDongDoi && memberCount < 2 && (
                <span className="chip-open">
                  + Còn 1 chỗ ghép đội
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card-actions">
        {canStudentApply && (
          <button
            onClick={() => onApply(topic)}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            Ứng tuyển ghép đội
          </button>
        )}

        {canInstructorReview && (
          <button
            onClick={() => onApprove(topic)}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            Thẩm định đề tài
          </button>
        )}

        {canDepartmentApprove && (
          <button
            onClick={() => onApprove(topic)}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            Phê duyệt đề tài
          </button>
        )}

        <button
          onClick={() => onViewProgress(topic)}
          className="btn-outline"
          style={{ flex: (canStudentApply || canInstructorReview || canDepartmentApprove) ? '0 0 auto' : 1 }}
        >
          {currentRole === 'student' ? 'Xem tiến độ' : 'Xem hồ sơ'}
        </button>
      </div>
    </div>
  );
}
