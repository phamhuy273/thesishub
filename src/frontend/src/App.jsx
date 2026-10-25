import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import TopicListPage from './pages/TopicListPage';
import InstructorsPage from './pages/InstructorsPage';
import RegulationsPage from './pages/RegulationsPage';
import CreateTopicModal from './components/CreateTopicModal';
import ApplyTeamModal from './components/ApplyTeamModal';
import ApprovalModal from './components/ApprovalModal';
import TopicProgressModal from './components/TopicProgressModal';
import {
  fetchDeTaiList,
  createDeTai,
  applyTeam,
  updateTrangThai,
  getGiangVienList
} from './services/api';

export default function App() {
  const [deTaiList, setDeTaiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('topics');
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [toast, setToast] = useState(null);
  const [currentRole, setCurrentRole] = useState('student');

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const [openProgressModal, setOpenProgressModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [progressTopic, setProgressTopic] = useState(null);

  const [applyStudentId, setApplyStudentId] = useState('SV02');
  const [createForm, setCreateForm] = useState({
    maDeTai: 'DT03',
    tenDeTai: '',
    moTa: '',
    maGiangVien: 'GV01',
    maSoSinhVien: 'SV01',
    timDongDoi: true
  });

  const giangVienList = getGiangVienList();

  const getNextMaDeTai = (list) => {
    const numbers = (list || [])
      .map(d => {
        const m = d.maDeTai && d.maDeTai.match(/\d+/);
        return m ? parseInt(m[0], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const max = numbers.length > 0 ? Math.max(...numbers) : 2;
    return 'DT' + String(max + 1).padStart(2, '0');
  };

  const showNotification = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async () => {
    try {
      const res = await fetchDeTaiList();
      setDeTaiList(res.data);
      setCreateForm(prev => ({
        ...prev,
        maDeTai: getNextMaDeTai(res.data)
      }));
    } catch (err) {
      showNotification('Không thể kết nối máy chủ', true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreateModal = () => {
    const takenStudents = new Set(
      (deTaiList || [])
        .filter(d => d.trangThai !== 'GV_TU_CHOI' && d.trangThai !== 'BO_MON_TU_CHOI')
        .flatMap(d => (d.danhSachSinhVien || []).map(s => s.maSoSinhVien))
    );
    let candidateId = 'SV03';
    for (let i = 1; i <= 20; i++) {
      const id = 'SV' + String(i).padStart(2, '0');
      if (!takenStudents.has(id)) {
        candidateId = id;
        break;
      }
    }

    setCreateForm(prev => ({
      ...prev,
      maDeTai: getNextMaDeTai(deTaiList),
      maSoSinhVien: candidateId,
      tenDeTai: '',
      moTa: '',
      timDongDoi: true
    }));
    setOpenCreateModal(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.maDeTai.trim() || !createForm.tenDeTai.trim()) {
      showNotification('Vui lòng nhập đầy đủ mã và tên đề tài', true);
      return;
    }

    const takenStudents = new Set(
      (deTaiList || [])
        .filter(d => d.trangThai !== 'GV_TU_CHOI' && d.trangThai !== 'BO_MON_TU_CHOI')
        .flatMap(d => (d.danhSachSinhVien || []).map(s => s.maSoSinhVien))
    );
    if (takenStudents.has(createForm.maSoSinhVien.trim())) {
      showNotification(`Sinh viên ${createForm.maSoSinhVien} đã có đề tài trong học kỳ (Vi phạm quy chế BR-04)`, true);
      return;
    }

    try {
      await createDeTai(createForm);
      showNotification('Đề xuất đề tài đã được ghi nhận thành công');
      setOpenCreateModal(false);
      await loadData();
    } catch (err) {
      showNotification(err.message || 'Lỗi khi gửi đề xuất', true);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedTopic || !applyStudentId.trim()) return;

    const takenStudents = new Set(
      (deTaiList || [])
        .filter(d => d.trangThai !== 'GV_TU_CHOI' && d.trangThai !== 'BO_MON_TU_CHOI')
        .flatMap(d => (d.danhSachSinhVien || []).map(s => s.maSoSinhVien))
    );
    if (takenStudents.has(applyStudentId.trim())) {
      showNotification(`Sinh viên ${applyStudentId} đã có đề tài trong học kỳ, không thể ứng tuyển đề tài khác (Vi phạm BR-04)`, true);
      return;
    }

    try {
      await applyTeam(selectedTopic.maDeTai, applyStudentId.trim());
      showNotification(`Đã kết nạp sinh viên ${applyStudentId} vào nhóm đề tài ${selectedTopic.maDeTai}`);
      setOpenApplyModal(false);
      await loadData();
    } catch (err) {
      showNotification(err.message || 'Lỗi khi ứng tuyển ghép đội', true);
    }
  };

  const handleApprovalSubmit = async (actionEndpoint) => {
    if (!selectedTopic) return;

    try {
      await updateTrangThai(selectedTopic.maDeTai, actionEndpoint);
      showNotification('Cập nhật trạng thái thẩm định thành công');
      setOpenApprovalModal(false);
      await loadData();
    } catch (err) {
      showNotification(err.message || 'Lỗi khi cập nhật trạng thái', true);
    }
  };

  const handleOpenApply = (topic) => {
    setSelectedTopic(topic);
    setOpenApplyModal(true);
  };

  const handleOpenApprove = (topic) => {
    setSelectedTopic(topic);
    setOpenApprovalModal(true);
  };

  const handleOpenProgress = (topic) => {
    setProgressTopic(topic);
    setOpenProgressModal(true);
  };

  const handleNavigate = (tab, filter = 'ALL') => {
    setActiveTab(tab);
    if (filter) {
      setTopicFilter(filter);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Toast toast={toast} />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={handleOpenCreateModal}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />

      <main className="container" style={{ margin: '1.75rem auto' }}>
        {activeTab === 'topics' && (
          <TopicListPage
            deTaiList={deTaiList}
            loading={loading}
            onApply={handleOpenApply}
            onApprove={handleOpenApprove}
            onViewProgress={handleOpenProgress}
            currentRole={currentRole}
            filter={topicFilter}
            setFilter={setTopicFilter}
          />
        )}

        {activeTab === 'instructors' && (
          <InstructorsPage
            giangVienList={giangVienList}
            deTaiList={deTaiList}
          />
        )}

        {activeTab === 'regulations' && (
          <RegulationsPage onNavigate={handleNavigate} />
        )}
      </main>

      <CreateTopicModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={handleCreateSubmit}
        form={createForm}
        setForm={setCreateForm}
        giangVienList={giangVienList}
        deTaiList={deTaiList}
      />

      <ApplyTeamModal
        isOpen={openApplyModal}
        onClose={() => setOpenApplyModal(false)}
        onSubmit={handleApplySubmit}
        selectedTopic={selectedTopic}
        studentId={applyStudentId}
        setStudentId={setApplyStudentId}
      />

      <ApprovalModal
        isOpen={openApprovalModal}
        onClose={() => setOpenApprovalModal(false)}
        onSubmit={handleApprovalSubmit}
        selectedTopic={selectedTopic}
        currentRole={currentRole}
      />

      <TopicProgressModal
        isOpen={openProgressModal}
        onClose={() => setOpenProgressModal(false)}
        topic={progressTopic}
      />
    </div>
  );
}
