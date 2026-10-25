import React, { useState } from 'react';
import TopicCard from '../components/TopicCard';

export default function TopicListPage({
  deTaiList,
  loading,
  onApply,
  onApprove,
  onViewProgress,
  onDeleteTopic,
  currentRole,
  filter: externalFilter,
  setFilter: externalSetFilter
}) {
  const [internalFilter, setInternalFilter] = useState('ALL');
  const filter = externalFilter !== undefined ? externalFilter : internalFilter;
  const setFilter = externalSetFilter || setInternalFilter;
  const [search, setSearch] = useState('');

  const countAll = deTaiList.length;
  const countMatchmaking = deTaiList.filter(d => d.dangTimDongDoi && (d.danhSachSinhVien || []).length < 2).length;
  const countPendingGV = deTaiList.filter(d => d.trangThai === 'CHO_GV_DONG_Y').length;
  const countPendingBM = deTaiList.filter(d => d.trangThai === 'CHO_BO_MON_DUYET').length;
  const countApproved = deTaiList.filter(d => d.trangThai === 'DUOC_BAO_VE').length;

  const filteredTopics = deTaiList.filter((item) => {
    const query = search.toLowerCase();
    const matchQuery =
      item.tenDeTai.toLowerCase().includes(query) ||
      item.maDeTai.toLowerCase().includes(query) ||
      (item.giangVienHuongDan?.hoTen || '').toLowerCase().includes(query);

    if (!matchQuery) return false;
    if (filter === 'MATCHMAKING') return item.dangTimDongDoi && (item.danhSachSinhVien || []).length < 2;
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
            placeholder="Tìm kiếm theo mã, tên đề tài hoặc cán bộ hướng dẫn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          <button
            onClick={() => setFilter('ALL')}
            className={`chip ${filter === 'ALL' ? 'active' : ''}`}
          >
            Tất cả ({countAll})
          </button>
          <button
            onClick={() => setFilter('MATCHMAKING')}
            className={`chip ${filter === 'MATCHMAKING' ? 'active' : ''}`}
          >
            Cần ghép đội ({countMatchmaking})
          </button>
          <button
            onClick={() => setFilter('PENDING_GV')}
            className={`chip ${filter === 'PENDING_GV' ? 'active' : ''}`}
          >
            Chờ GV thẩm định ({countPendingGV})
          </button>
          <button
            onClick={() => setFilter('PENDING_BM')}
            className={`chip ${filter === 'PENDING_BM' ? 'active' : ''}`}
          >
            Chờ Bộ môn duyệt ({countPendingBM})
          </button>
          <button
            onClick={() => setFilter('APPROVED')}
            className={`chip ${filter === 'APPROVED' ? 'active' : ''}`}
          >
            Được bảo vệ ({countApproved})
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '14px' }}>
          Đang nạp dữ liệu đề tài từ máy chủ...
        </div>
      ) : filteredTopics.length === 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
            Không có đề tài nào ở trạng thái này
          </div>
          <div style={{ fontSize: '14px' }}>
            Thử thay đổi bộ lọc tìm kiếm hoặc từ khóa để hiển thị kết quả.
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: '20px' }}>
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id || topic.maDeTai}
              topic={topic}
              onApply={onApply}
              onApprove={onApprove}
              onViewProgress={onViewProgress}
              onDelete={onDeleteTopic}
              currentRole={currentRole}
            />
          ))}
        </div>
      )}
    </div>
  );
}
