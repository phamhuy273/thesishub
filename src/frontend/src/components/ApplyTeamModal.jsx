import React from 'react';

export default function ApplyTeamModal({
  isOpen,
  onClose,
  onSubmit,
  selectedTopic,
  studentId,
  setStudentId
}) {
  if (!isOpen || !selectedTopic) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '8px', maxWidth: '440px', width: '100%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Ứng tuyển ghép đội</h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.825rem', color: '#64748b' }}>
          Ứng tuyển tham gia đề tài: <strong>{selectedTopic.maDeTai} — {selectedTopic.tenDeTai}</strong>
        </p>

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Mã số sinh viên ứng tuyển</label>
            <input
              type="text"
              placeholder="Ví dụ: SV02"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.45rem 0.9rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{ background: '#059669', color: '#fff', border: 'none', padding: '0.45rem 1.1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Xác nhận kết nạp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
