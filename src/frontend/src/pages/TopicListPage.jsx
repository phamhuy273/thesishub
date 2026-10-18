import React, { useState } from 'react';
import TopicCard from '../components/TopicCard';

export default function TopicListPage({
  deTaiList,
  loading,
  onApply,
  onApprove
}) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredTopics = deTaiList.filter((item) => {
    const query = search.toLowerCase();
    const matchQuery =
      item.tenDeTai.toLowerCase().includes(query) ||
      item.maDeTai.toLowerCase().includes(query) ||
      (item.giangVienHuongDan?.hoTen || '').toLowerCase().includes(query);

    if (!matchQuery) return false;
    if (filter === 'MATCHMAKING') return item.dangTimDongDoi;
    if (filter === 'PENDING_GV') return item.trangThai === 'CHO_GV_DONG_Y';
    if (filter === 'PENDING_BM') return item.trangThai === 'CHO_BO_MON_DUYET';
    if (filter === 'APPROVED') return item.trangThai === 'DUOC_BAO_VE';
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: '1 1 320px' }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã, tiêu đề đề tài hoặc tên giảng viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('ALL')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 500,
              background: filter === 'ALL' ? '#0f172a' : '#fff',
              color: filter === 'ALL' ? '#fff' : '#475569',
              cursor: 'pointer'
            }}
          >
            Tất cả ({deTaiList.length})
          </button>
          <button
            onClick={() => setFilter('MATCHMAKING')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 500,
              background: filter === 'MATCHMAKING' ? '#0f172a' : '#fff',
              color: filter === 'MATCHMAKING' ? '#fff' : '#475569',
              cursor: 'pointer'
            }}
          >
            Cần ghép đội
          </button>
          <button
            onClick={() => setFilter('PENDING_GV')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 500,
              background: filter === 'PENDING_GV' ? '#0f172a' : '#fff',
              color: filter === 'PENDING_GV' ? '#fff' : '#475569',
              cursor: 'pointer'
            }}
          >
            Chờ GV thẩm định
          </button>
          <button
            onClick={() => setFilter('PENDING_BM')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 500,
              background: filter === 'PENDING_BM' ? '#0f172a' : '#fff',
              color: filter === 'PENDING_BM' ? '#fff' : '#475569',
              cursor: 'pointer'
            }}
          >
            Chờ Bộ môn duyệt
          </button>
          <button
            onClick={() => setFilter('APPROVED')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 500,
              background: filter === 'APPROVED' ? '#0f172a' : '#fff',
              color: filter === 'APPROVED' ? '#fff' : '#475569',
              cursor: 'pointer'
            }}
          >
            Được bảo vệ
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b', fontSize: '0.9rem' }}>
          Đang nạp dữ liệu đề tài từ máy chủ...
        </div>
      ) : filteredTopics.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '3.5rem 1rem', textAlign: 'center', color: '#64748b' }}>
          Không tìm thấy đề tài nào phù hợp với điều kiện lọc hiện tại.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id || topic.maDeTai}
              topic={topic}
              onApply={onApply}
              onApprove={onApprove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
