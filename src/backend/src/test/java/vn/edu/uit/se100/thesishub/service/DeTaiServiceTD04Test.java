package vn.edu.uit.se100.thesishub.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import jakarta.persistence.EntityManager;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.uit.se100.thesishub.domain.DeTaiTotNghiep;
import vn.edu.uit.se100.thesishub.domain.GiangVienHuongDan;
import vn.edu.uit.se100.thesishub.domain.TrangThaiDeTai;
import vn.edu.uit.se100.thesishub.domain.TrangThaiPheDuyetGV;
import vn.edu.uit.se100.thesishub.repository.DeTaiTotNghiepRepository;
import vn.edu.uit.se100.thesishub.repository.GiangVienHuongDanRepository;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class DeTaiServiceTD04Test {

    @Autowired private DeTaiService deTaiService;
    @Autowired private DeTaiTotNghiepRepository deTaiRepository;
    @Autowired private GiangVienHuongDanRepository giangVienRepository;
    @Autowired private JdbcTemplate jdbc;
    @Autowired private EntityManager em;
    @Autowired private MockMvc mockMvc;

    private static final List<String> BA_GV = List.of("TGV1", "TGV2", "TGV3");

    @BeforeEach
    void taoGiangVien() {
        for (int i = 1; i <= 6; i++) {
            themGiangVien("TGV" + i, 10);
        }
    }

    private GiangVienHuongDan themGiangVien(String ma, int hanMuc) {
        return giangVienRepository.save(new GiangVienHuongDan("ND_" + ma, "Giảng viên " + ma, ma + "@uit.edu.vn", "0900000000", ma, hanMuc));
    }

    private int soLuong(String ma) {
        return giangVienRepository.findByMaGiangVien(ma).orElseThrow().getSoLuongHienTai();
    }

    private DeTaiTotNghiep nop(String maDeTai, List<String> dsGv, String mssv) {
        return deTaiService.dangKyDeTai(maDeTai, "Đề tài " + maDeTai, "Mô tả", dsGv, mssv, true);
    }

    @Test
    void test_TD04_nop_voi_5_giang_vien_duoc_chap_nhan_va_moi_nguoi_giu_chi_tieu() {
        DeTaiTotNghiep deTai = nop("TDT1", List.of("TGV1", "TGV2", "TGV3", "TGV4", "TGV5"), "TSV1");

        assertThat(deTai.getDanhSachPhanCong()).hasSize(5);
        for (int i = 1; i <= 5; i++) {
            assertThat(soLuong("TGV" + i)).isEqualTo(1);
        }
    }

    @Test
    void test_TD04_nop_voi_6_giang_vien_bi_tu_choi_va_khong_tinh_chi_tieu() {
        assertThatThrownBy(() -> nop("TDT1", List.of("TGV1", "TGV2", "TGV3", "TGV4", "TGV5", "TGV6"), "TSV1"))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("tối đa 5");

        assertThat(soLuong("TGV1")).isZero();
        assertThat(deTaiRepository.findByMaDeTai("TDT1")).isEmpty();
    }

    @Test
    void test_BR01_kiem_tra_rieng_tung_giang_vien_mot_nguoi_het_han_muc_thi_chan_ca_de_tai() {
        themGiangVien("TGVDAY", 0);

        assertThatThrownBy(() -> nop("TDT1", List.of("TGV1", "TGVDAY"), "TSV1"))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("BR-01");

        assertThat(soLuong("TGV1")).isZero();
    }

    @Test
    void test_BR01_ung_tuyen_tinh_them_cho_moi_giang_vien_con_hieu_luc() {
        nop("TDT1", BA_GV, "TSV1");
        deTaiService.giangVienTuChoi("TDT1", "TGV2", null);

        deTaiService.ungTuyenGhepDoi("TDT1", "TSV2");

        assertThat(soLuong("TGV1")).isEqualTo(2);
        assertThat(soLuong("TGV2")).isZero();
        assertThat(soLuong("TGV3")).isEqualTo(2);
    }

    @Test
    void test_BR01_giang_vien_tu_choi_duoc_hoan_ngay_nguoi_khac_giu_nguyen() {
        nop("TDT1", BA_GV, "TSV1");

        DeTaiTotNghiep deTai = deTaiService.giangVienTuChoi("TDT1", "TGV1", "Không phù hợp");

        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_GV_DONG_Y);
        assertThat(soLuong("TGV1")).isZero();
        assertThat(soLuong("TGV2")).isEqualTo(1);
        assertThat(soLuong("TGV3")).isEqualTo(1);
    }

    @Test
    void test_TD04_du_y_kien_co_mot_dong_y_thi_len_bo_mon_roi_duoc_bao_ve() {
        nop("TDT1", BA_GV, "TSV1");

        deTaiService.giangVienTuChoi("TDT1", "TGV1", null);
        deTaiService.giangVienTuChoi("TDT1", "TGV2", null);
        DeTaiTotNghiep deTai = deTaiService.giangVienDuyet("TDT1", "TGV3", null);
        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_BO_MON_DUYET);

        deTai = deTaiService.boMonDuyet("TDT1");
        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.DUOC_BAO_VE);
        assertThat(soLuong("TGV3")).isEqualTo(1);
    }

    @Test
    void test_TD04_tat_ca_tu_choi_thi_GV_TU_CHOI_va_sinh_vien_duoc_nop_lai() {
        nop("TDT1", List.of("TGV1", "TGV2"), "TSV1");

        deTaiService.giangVienTuChoi("TDT1", "TGV1", null);
        DeTaiTotNghiep deTai = deTaiService.giangVienTuChoi("TDT1", "TGV2", null);

        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.GV_TU_CHOI);
        assertThat(soLuong("TGV1")).isZero();
        assertThat(soLuong("TGV2")).isZero();
        assertThat(nop("TDT2", List.of("TGV1"), "TSV1").getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_GV_DONG_Y);
    }

    @Test
    void test_BR01_bo_mon_tu_choi_chi_hoan_cho_giang_vien_chua_tu_choi() {
        nop("TDT1", List.of("TGV1", "TGV2"), "TSV1");
        deTaiService.giangVienTuChoi("TDT1", "TGV1", null);
        deTaiService.giangVienDuyet("TDT1", "TGV2", null);

        deTaiService.boMonTuChoi("TDT1");

        assertThat(soLuong("TGV1")).isZero();
        assertThat(soLuong("TGV2")).isZero();
    }

    @Test
    void test_BR01_huy_de_xuat_hoan_cho_giang_vien_con_hieu_luc() {
        nop("TDT1", BA_GV, "TSV1");
        deTaiService.giangVienTuChoi("TDT1", "TGV1", null);

        deTaiService.huyDeTai("TDT1", "TSV1");
        em.flush();

        assertThat(deTaiRepository.findByMaDeTai("TDT1")).isEmpty();
        assertThat(soLuong("TGV1")).isZero();
        assertThat(soLuong("TGV2")).isZero();
        assertThat(soLuong("TGV3")).isZero();
    }

    @Test
    void test_TD04_tra_cuu_theo_giang_vien_qua_phan_cong() {
        nop("TDT1", BA_GV, "TSV1");
        em.flush();

        Long id = giangVienRepository.findByMaGiangVien("TGV2").orElseThrow().getId();

        assertThat(deTaiService.layDeTaiTheoGiangVien(id)).extracting(DeTaiTotNghiep::getMaDeTai).contains("TDT1");
    }

    private void chenDeTaiCu(String ma, String trangThai, GiangVienHuongDan gv) {
        jdbc.update("""
                INSERT INTO de_tai_tot_nghiep (ma_de_tai, ten_de_tai, trang_thai, dang_tim_dong_doi, giang_vien_id)
                VALUES (?, ?, ?, false, ?)""", ma, "Đề tài cũ " + ma, trangThai, gv.getId());
    }

    @Test
    void test_TD04_du_lieu_cu_chuyen_doi_dung_trang_thai_va_khong_doi_chi_tieu() {
        GiangVienHuongDan gv = giangVienRepository.findByMaGiangVien("TGV1").orElseThrow();
        gv.tangSoLuong(3);
        em.flush();
        chenDeTaiCu("CU_CHO", "CHO_GV_DONG_Y", gv);
        chenDeTaiCu("CU_TUCHOI", "GV_TU_CHOI", gv);
        chenDeTaiCu("CU_BOMON", "CHO_BO_MON_DUYET", gv);
        chenDeTaiCu("CU_BAOVE", "DUOC_BAO_VE", gv);
        em.clear();

        assertThat(deTaiService.chuyenDoiDuLieuCu()).isGreaterThanOrEqualTo(4);
        em.flush();
        em.clear();

        assertThat(phanDuyNhat("CU_CHO")).isEqualTo(TrangThaiPheDuyetGV.CHO_DUYET);
        assertThat(phanDuyNhat("CU_TUCHOI")).isEqualTo(TrangThaiPheDuyetGV.TU_CHOI);
        assertThat(phanDuyNhat("CU_BOMON")).isEqualTo(TrangThaiPheDuyetGV.DONG_Y);
        assertThat(phanDuyNhat("CU_BAOVE")).isEqualTo(TrangThaiPheDuyetGV.DONG_Y);
        assertThat(deTaiRepository.findByMaDeTai("CU_BAOVE").orElseThrow().getTrangThai()).isEqualTo(TrangThaiDeTai.DUOC_BAO_VE);
        assertThat(soLuong("TGV1")).isEqualTo(3);

        assertThat(deTaiService.chuyenDoiDuLieuCu()).isZero();
    }

    @Test
    void test_TD04_du_lieu_cu_van_tham_dinh_duoc_khi_khong_truyen_ma_giang_vien() {
        GiangVienHuongDan gv = giangVienRepository.findByMaGiangVien("TGV1").orElseThrow();
        gv.tangSoLuong(1);
        em.flush();
        chenDeTaiCu("CU_CHO", "CHO_GV_DONG_Y", gv);
        em.clear();
        deTaiService.chuyenDoiDuLieuCu();

        DeTaiTotNghiep deTai = deTaiService.giangVienDuyet("CU_CHO", null, null);

        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_BO_MON_DUYET);
    }

    private TrangThaiPheDuyetGV phanDuyNhat(String maDeTai) {
        List<TrangThaiPheDuyetGV> trangThai = deTaiRepository.findByMaDeTai(maDeTai).orElseThrow()
                .getDanhSachPhanCong().stream().map(pc -> pc.getTrangThaiDuyet()).toList();
        assertThat(trangThai).hasSize(1);
        return trangThai.get(0);
    }

    @Test
    void test_TD04_api_nhan_danh_sach_tra_ve_tung_phan_va_truong_cu() throws Exception {
        mockMvc.perform(post("/api/de-tai").contentType(MediaType.APPLICATION_JSON).content("""
                        {"maDeTai":"TDT1","tenDeTai":"Đề tài","moTa":"","danhSachMaGiangVien":["TGV1","TGV2"],"maSoSinhVien":"TSV1","timDongDoi":false}"""))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.danhSachPhanCong.length()").value(2))
                .andExpect(jsonPath("$.danhSachPhanCong[1].giangVien.maGiangVien").value("TGV2"))
                .andExpect(jsonPath("$.danhSachPhanCong[1].trangThaiDuyet").value("CHO_DUYET"))
                .andExpect(jsonPath("$.giangVienHuongDan.maGiangVien").value("TGV1"));

        mockMvc.perform(put("/api/de-tai/TDT1/gv-tu-choi").param("maGiangVien", "TGV1").param("yKien", "Không phù hợp"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.trangThai").value("CHO_GV_DONG_Y"))
                .andExpect(jsonPath("$.danhSachPhanCong[0].trangThaiDuyet").value("TU_CHOI"))
                .andExpect(jsonPath("$.danhSachPhanCong[0].nhanXet").value("Không phù hợp"));

        mockMvc.perform(put("/api/de-tai/TDT1/gv-duyet"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/de-tai/TDT1")).andExpect(status().isOk());
    }

    @Test
    void test_TD04_api_van_nhan_maGiangVien_don_cua_client_cu() throws Exception {
        mockMvc.perform(post("/api/de-tai").contentType(MediaType.APPLICATION_JSON).content("""
                        {"maDeTai":"TDT1","tenDeTai":"Đề tài","moTa":"","maGiangVien":"TGV1","maSoSinhVien":"TSV1","timDongDoi":false}"""))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.danhSachPhanCong.length()").value(1));

        mockMvc.perform(put("/api/de-tai/TDT1/gv-duyet"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.trangThai").value("CHO_BO_MON_DUYET"));
    }
}
