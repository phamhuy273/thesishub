import React from 'react';
import { STATUS_CONFIG } from '../constants/status';

export default function TopicProgressModal({ isOpen, onClose, topic }) {
  if (!isOpen || !topic) return null;

  const status = STATUS_CONFIG[topic.trangThai] || { text: topic.trangThai, color: '#475569', bg: '#f1f5f9', border: '#cbd5e1' };
  const memberCount = (topic.danhSachSinhVien || []).length;

  const isStep1Done = true;
  const isStep2Done = topic.trangThai === 'CHO_BO_MON_DUYET' || topic.trangThai === 'DUOC_BAO_VE';
  const isStep2Pending = topic.trangThai === 'CHO_GV_DONG_Y';
  const isStep2Rejected = topic.trangThai === 'GV_TU_CHOI';

  const isStep3Done = topic.trangThai === 'DUOC_BAO_VE';
  const isStep3Pending = topic.trangThai === 'CHO_BO_MON_DUYET';
  const isStep3Rejected = topic.trangThai === 'BO_MON_TU_CHOI';
  const isStep3Waiting = isStep2Pending || isStep2Rejected;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '560px', width: '100%', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="code-pill">{topic.maDeTai}</span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: status.color,
                background: status.bg,
                border: `1px solid ${status.border}`,
                padding: '2px 8px',
                borderRadius: '999px'
              }}
            >
              {status.text}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748b', cursor: 'pointer', padding: '4px' }}
          >
            ✕
          </button>
        </div>

        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>
          {topic.tenDeTai}
        </h3>
        <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {topic.moTa || 'Chưa có thông tin mô tả chi tiết'}
        </p>

        <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #f1f5f9', marginBottom: '1.5rem', fontSize: '13px' }}>
          <div style={{ marginBottom: '6px', color: '#475569' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Cán bộ hướng dẫn:</span> {topic.giangVienHuongDan?.hoTen} ({topic.giangVienHuongDan?.maGiangVien})
          </div>
          <div style={{ color: '#475569' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Thành viên ({memberCount}/2):</span>{' '}
            {(topic.danhSachSinhVien || []).map(s => `${s.hoTen} (${s.maSoSinhVien})`).join(', ') || 'Chưa có'}
          </div>
        </div>

        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>
          Tiến trình xét duyệt đề tài (Quy trình 2 cấp BR-03)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '28px', borderLeft: '2px solid var(--border)', marginLeft: '10px', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-35px', top: '2px', width: '14px', height: '14px', borderRadius: '999px', background: isStep1Done ? '#15803d' : '#94a3b8', border: '2px solid #fff', boxShadow: '0 0 0 2px ' + (isStep1Done ? '#15803d' : '#94a3b8') }}></div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
              1. Nộp đề xuất đề tài (UC-01)
            </div>
            <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
              ✓ Đã ghi nhận hồ sơ đăng ký thành công trên hệ thống.
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-35px', top: '2px', width: '14px', height: '14px', borderRadius: '999px', background: isStep2Done ? '#15803d' : isStep2Pending ? '#b45309' : isStep2Rejected ? '#b91c1c' : '#94a3b8', border: '2px solid #fff', boxShadow: '0 0 0 2px ' + (isStep2Done ? '#15803d' : isStep2Pending ? '#b45309' : isStep2Rejected ? '#b91c1c' : '#94a3b8') }}></div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
              2. GVHD Thẩm định chuyên môn (UC-04)
            </div>
            <div style={{ fontSize: '12px', marginTop: '2px', color: isStep2Done ? '#15803d' : isStep2Pending ? '#b45309' : isStep2Rejected ? '#b91c1c' : 'var(--text-muted)' }}>
              {isStep2Done && '✓ Giảng viên hướng dẫn đã thẩm định đồng ý và chuyển tiếp lên Bộ môn.'}
              {isStep2Pending && '⏳ Đang chờ Giảng viên hướng dẫn thẩm định chuyên môn và hạn mức.'}
              {isStep2Rejected && '✕ Giảng viên hướng dẫn đã từ chối tiếp nhận đề tài.'}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-35px', top: '2px', width: '14px', height: '14px', borderRadius: '999px', background: isStep3Done ? '#15803d' : isStep3Pending ? '#0e7490' : isStep3Rejected ? '#b91c1c' : '#cbd5e1', border: '2px solid #fff', boxShadow: '0 0 0 2px ' + (isStep3Done ? '#15803d' : isStep3Pending ? '#0e7490' : isStep3Rejected ? '#b91c1c' : '#cbd5e1') }}></div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: isStep3Waiting ? 'var(--text-muted)' : 'var(--text)' }}>
              3. Trưởng bộ môn phê duyệt chính thức (UC-05)
            </div>
            <div style={{ fontSize: '12px', marginTop: '2px', color: isStep3Done ? '#15803d' : isStep3Pending ? '#0e7490' : isStep3Rejected ? '#b91c1c' : 'var(--text-muted)' }}>
              {isStep3Done && '✓ Đã được Trưởng bộ môn phê duyệt. Đủ điều kiện ra Hội đồng bảo vệ.'}
              {isStep3Pending && '⏳ Đang chờ Trưởng bộ môn xem xét phê duyệt chính thức.'}
              {isStep3Rejected && '✕ Trưởng bộ môn từ chối phê duyệt đề tài.'}
              {isStep3Waiting && '○ Chưa thực hiện (bắt buộc hoàn thành bước 2 trước theo BR-03).'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="btn-outline"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
