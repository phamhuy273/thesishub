import React from 'react';

export default function ApprovalModal({
  isOpen,
  onClose,
  onSubmit,
  selectedTopic
}) {
  if (!isOpen || !selectedTopic) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '8px', maxWidth: '480px', width: '100%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Thẩm định & Phê duyệt Đề tài</h3>
        <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.825rem', color: '#64748b' }}>
          Mã: <strong>{selectedTopic.maDeTai}</strong> · Trạng thái hiện tại: <strong>{selectedTopic.trangThai}</strong>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {selectedTopic.trangThai === 'CHO_GV_DONG_Y' && (
            <>
              <button
                onClick={() => onSubmit('gv-duyet')}
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                1. GV Hướng dẫn: Thẩm định đồng ý → Chuyển lên Bộ môn
              </button>
              <button
                onClick={() => onSubmit('gv-tu-choi')}
                style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '0.65rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                2. GV Hướng dẫn: Từ chối đề tài
              </button>
            </>
          )}

          {selectedTopic.trangThai === 'CHO_BO_MON_DUYET' && (
            <>
              <button
                onClick={() => onSubmit('bo-mon-duyet')}
                style={{ background: '#059669', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                1. Trưởng bộ môn: Phê duyệt chính thức → Đủ điều kiện bảo vệ
              </button>
              <button
                onClick={() => onSubmit('bo-mon-tu-choi')}
                style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '0.65rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                2. Trưởng bộ môn: Từ chối đề tài
              </button>
            </>
          )}

          {selectedTopic.trangThai !== 'CHO_GV_DONG_Y' && selectedTopic.trangThai !== 'CHO_BO_MON_DUYET' && (
            <div style={{ fontSize: '0.85rem', color: '#64748b', background: '#f8fafc', padding: '0.75rem', borderRadius: '4px' }}>
              Đề tài này đã hoàn tất quá trình xét duyệt ({selectedTopic.trangThai}).
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.45rem 1rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
