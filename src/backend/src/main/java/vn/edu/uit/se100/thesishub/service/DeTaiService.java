package vn.edu.uit.se100.thesishub.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import vn.edu.uit.se100.thesishub.domain.DeTaiTotNghiep;
import vn.edu.uit.se100.thesishub.domain.GiangVienHuongDan;
import vn.edu.uit.se100.thesishub.domain.SinhVien;
import vn.edu.uit.se100.thesishub.domain.TrangThaiDeTai;
import vn.edu.uit.se100.thesishub.repository.DeTaiTotNghiepRepository;
import vn.edu.uit.se100.thesishub.repository.GiangVienHuongDanRepository;
import vn.edu.uit.se100.thesishub.repository.SinhVienRepository;

@Service
@Transactional
public class DeTaiService {

    private final DeTaiTotNghiepRepository deTaiRepository;
    private final GiangVienHuongDanRepository giangVienRepository;
    private final SinhVienRepository sinhVienRepository;

    public DeTaiService(
        DeTaiTotNghiepRepository deTaiRepository,
        GiangVienHuongDanRepository giangVienRepository,
        SinhVienRepository sinhVienRepository
    ) {
        this.deTaiRepository = deTaiRepository;
        this.giangVienRepository = giangVienRepository;
        this.sinhVienRepository = sinhVienRepository;
    }

    public DeTaiTotNghiep dangKyDeTai(String maDeTai, String tenDeTai, String moTa, String maGiangVien, String maSoSinhVien, boolean timDongDoi) {
        if (deTaiRepository.findByMaDeTai(maDeTai).isPresent()) {
            throw new IllegalStateException("Mã đề tài đã tồn tại: " + maDeTai);
        }

        GiangVienHuongDan gv = giangVienRepository.findByMaGiangVien(maGiangVien)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giảng viên: " + maGiangVien));

        SinhVien sv = sinhVienRepository.findByMaSoSinhVien(maSoSinhVien)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sinh viên: " + maSoSinhVien));

        gv.tangSoLuong(1);
        DeTaiTotNghiep deTai = new DeTaiTotNghiep(maDeTai, tenDeTai, moTa, gv);
        deTai.themSinhVien(sv);

        if (timDongDoi) {
            deTai.batTimDongDoi();
        }

        giangVienRepository.save(gv);
        return deTaiRepository.save(deTai);
    }

    public DeTaiTotNghiep ungTuyenGhepDoi(String maDeTai, String maSoSinhVienUngTuyen) {
        DeTaiTotNghiep deTai = deTaiRepository.findByMaDeTai(maDeTai)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề tài: " + maDeTai));

        if (!deTai.isDangTimDongDoi()) {
            throw new IllegalStateException("Đề tài không tìm đồng đội hoặc đã đủ thành viên");
        }

        SinhVien sv = sinhVienRepository.findByMaSoSinhVien(maSoSinhVienUngTuyen)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sinh viên: " + maSoSinhVienUngTuyen));

        GiangVienHuongDan gv = deTai.getGiangVienHuongDan();
        gv.tangSoLuong(1);
        giangVienRepository.save(gv);

        deTai.themSinhVien(sv);
        return deTaiRepository.save(deTai);
    }

    public DeTaiTotNghiep giangVienDuyet(String maDeTai) {
        DeTaiTotNghiep deTai = deTaiRepository.findByMaDeTai(maDeTai)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề tài: " + maDeTai));

        if (deTai.getTrangThai() != TrangThaiDeTai.CHO_GV_DONG_Y) {
            throw new IllegalStateException("Trạng thái đề tài không hợp lệ để GV duyệt");
        }

        deTai.capNhatTrangThai(TrangThaiDeTai.CHO_BO_MON_DUYET);
        return deTaiRepository.save(deTai);
    }

    public DeTaiTotNghiep giangVienTuChoi(String maDeTai) {
        DeTaiTotNghiep deTai = deTaiRepository.findByMaDeTai(maDeTai)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề tài: " + maDeTai));

        if (deTai.getTrangThai() != TrangThaiDeTai.CHO_GV_DONG_Y) {
            throw new IllegalStateException("Trạng thái đề tài không hợp lệ để GV từ chối");
        }

        deTai.capNhatTrangThai(TrangThaiDeTai.GV_TU_CHOI);
        GiangVienHuongDan gv = deTai.getGiangVienHuongDan();
        gv.giamSoLuong(deTai.getDanhSachSinhVien().size());
        giangVienRepository.save(gv);

        return deTaiRepository.save(deTai);
    }

    public DeTaiTotNghiep boMonDuyet(String maDeTai) {
        DeTaiTotNghiep deTai = deTaiRepository.findByMaDeTai(maDeTai)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề tài: " + maDeTai));

        if (deTai.getTrangThai() != TrangThaiDeTai.CHO_BO_MON_DUYET) {
            throw new IllegalStateException("Trạng thái đề tài không hợp lệ để Bộ môn duyệt");
        }

        deTai.capNhatTrangThai(TrangThaiDeTai.DUOC_BAO_VE);
        return deTaiRepository.save(deTai);
    }

    public DeTaiTotNghiep boMonTuChoi(String maDeTai) {
        DeTaiTotNghiep deTai = deTaiRepository.findByMaDeTai(maDeTai)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề tài: " + maDeTai));

        if (deTai.getTrangThai() != TrangThaiDeTai.CHO_BO_MON_DUYET) {
            throw new IllegalStateException("Trạng thái đề tài không hợp lệ để Bộ môn từ chối");
        }

        deTai.capNhatTrangThai(TrangThaiDeTai.BO_MON_TU_CHOI);
        GiangVienHuongDan gv = deTai.getGiangVienHuongDan();
        gv.giamSoLuong(deTai.getDanhSachSinhVien().size());
        giangVienRepository.save(gv);

        return deTaiRepository.save(deTai);
    }

    @Transactional(readOnly = true)
    public List<DeTaiTotNghiep> layTatCaDeTai() {
        return deTaiRepository.findAll();
    }

    @Transactional(readOnly = true)
    public DeTaiTotNghiep layChiTietDeTai(String maDeTai) {
        return deTaiRepository.findByMaDeTai(maDeTai)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề tài: " + maDeTai));
    }

    @Transactional(readOnly = true)
    public List<DeTaiTotNghiep> layDeTaiDangTimDongDoi() {
        return deTaiRepository.findByDangTimDongDoiTrue();
    }

    @Transactional(readOnly = true)
    public List<DeTaiTotNghiep> layDeTaiTheoTrangThai(TrangThaiDeTai trangThai) {
        return deTaiRepository.findByTrangThai(trangThai);
    }

    @Transactional(readOnly = true)
    public List<DeTaiTotNghiep> layDeTaiTheoGiangVien(Long giangVienId) {
        return deTaiRepository.findByGiangVienHuongDanId(giangVienId);
    }
}
