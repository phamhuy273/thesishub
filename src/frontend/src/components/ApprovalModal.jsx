import React from 'react';

export default function ApprovalModal({
  isOpen,
  onClose,
  onSubmit,
  selectedTopic,
  currentRole
}) {
  if (!isOpen || !selectedTopic) return null;

  const isInstructor = currentRole === 'instructor';
  const isDepartment = currentRole === 'department';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '480px', width: '100%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
          {isInstructor ? 'Thẩm định Đề tài (GVHD)' : isDepartment ? 'Phê duyệt Đề tài (Trưởng bộ môn)' : 'Xét duyệt Đề tài'}
        </h3>
        <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.825rem', color: '#64748b' }}>
          Mã: <strong>{selectedTopic.maDeTai}</strong> · Trạng thái hiện tại: <strong>{selectedTopic.trangThai}</strong>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {isInstructor && selectedTopic.trangThai === 'CHO_GV_DONG_Y' && (
            <>
              <button
                onClick={() => onSubmit('gv-duyet')}
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                ✓ Thẩm định đồng ý → Chuyển tiếp lên Bộ môn
              </button>
              <button
                onClick={() => onSubmit('gv-tu-choi')}
                style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                ✕ Từ chối đề tài này
              </button>
            </>
          )}

          {isDepartment && selectedTopic.trangThai === 'CHO_BO_MON_DUYET' && (
            <>
              <button
                onClick={() => onSubmit('bo-mon-duyet')}
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                ✓ Phê duyệt chính thức → Cho phép bảo vệ
              </button>
              <button
                onClick={() => onSubmit('bo-mon-tu-choi')}
                style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                ✕ Không phê duyệt (Từ chối)
              </button>
            </>
          )}

          {((isInstructor && selectedTopic.trangThai !== 'CHO_GV_DONG_Y') ||
            (isDepartment && selectedTopic.trangThai !== 'CHO_BO_MON_DUYET') ||
            (!isInstructor && !isDepartment)) && (
            <div style={{ fontSize: '0.85rem', color: '#64748b', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
              {!isInstructor && !isDepartment
                ? 'Sinh viên không có quyền thực hiện thẩm định hoặc phê duyệt đề tài.'
                : isInstructor
                ? 'Đề tài này hiện không ở trạng thái chờ GVHD thẩm định.'
                : 'Đề tài này hiện không ở trạng thái chờ Bộ môn phê duyệt.'}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
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
