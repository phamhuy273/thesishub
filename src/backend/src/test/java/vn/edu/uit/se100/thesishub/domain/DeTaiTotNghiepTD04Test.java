package vn.edu.uit.se100.thesishub.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.Test;

class DeTaiTotNghiepTD04Test {

    private static GiangVienHuongDan gv(String ma) {
        return new GiangVienHuongDan("ND_" + ma, "Giảng viên " + ma, ma + "@uit.edu.vn", "0900000000", ma, 10);
    }

    private static List<GiangVienHuongDan> dsGv(int soLuong) {
        return IntStream.rangeClosed(1, soLuong).mapToObj(i -> gv("GV" + i)).toList();
    }

    private static DeTaiTotNghiep deTai(int soGiangVien) {
        return new DeTaiTotNghiep("DT", "Đề tài", "Mô tả", dsGv(soGiangVien));
    }

    private static TrangThaiPheDuyetGV trangThaiPhan(DeTaiTotNghiep deTai, String ma) {
        return deTai.getDanhSachPhanCong().stream()
                .filter(pc -> pc.getGiangVien().getMaGiangVien().equals(ma))
                .findFirst().orElseThrow().getTrangThaiDuyet();
    }

    @Test
    void test_TD04_chap_nhan_tu_1_den_5_giang_vien() {
        assertThat(deTai(1).getDanhSachPhanCong()).hasSize(1);
        assertThat(deTai(5).getDanhSachPhanCong()).hasSize(5);
    }

    @Test
    void test_TD04_khong_co_giang_vien_nao_bi_tu_choi() {
        assertThatThrownBy(() -> deTai(0)).isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void test_TD04_giang_vien_thu_6_bi_tu_choi_khi_tao_va_khi_them() {
        assertThatThrownBy(() -> deTai(6)).isInstanceOf(IllegalStateException.class);

        DeTaiTotNghiep daDu = deTai(5);
        assertThatThrownBy(() -> daDu.themGiangVien(gv("GV6"))).isInstanceOf(IllegalStateException.class);
        assertThat(daDu.getDanhSachPhanCong()).hasSize(5);
    }

    @Test
    void test_TD04_mot_giang_vien_khong_duoc_chon_hai_lan() {
        assertThatThrownBy(() -> new DeTaiTotNghiep("DT", "Đề tài", "Mô tả", List.of(gv("GV1"), gv("GV1"))))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void test_TD04_mot_giang_vien_tu_choi_khong_huy_phan_khac() {
        DeTaiTotNghiep deTai = deTai(3);

        deTai.giangVienTuChoi("GV1", "Không phù hợp");

        assertThat(trangThaiPhan(deTai, "GV1")).isEqualTo(TrangThaiPheDuyetGV.TU_CHOI);
        assertThat(trangThaiPhan(deTai, "GV2")).isEqualTo(TrangThaiPheDuyetGV.CHO_DUYET);
        assertThat(trangThaiPhan(deTai, "GV3")).isEqualTo(TrangThaiPheDuyetGV.CHO_DUYET);
        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_GV_DONG_Y);
    }

    @Test
    void test_TD04_chua_du_y_kien_thi_chua_len_bo_mon_du_da_co_nguoi_dong_y() {
        DeTaiTotNghiep deTai = deTai(2);

        deTai.giangVienDongY("GV1", null);

        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_GV_DONG_Y);
    }

    @Test
    void test_TD04_du_y_kien_va_co_it_nhat_mot_dong_y_thi_len_bo_mon() {
        DeTaiTotNghiep deTai = deTai(3);

        deTai.giangVienTuChoi("GV1", null);
        deTai.giangVienDongY("GV2", null);
        deTai.giangVienTuChoi("GV3", null);

        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_BO_MON_DUYET);
    }

    @Test
    void test_TD04_tat_ca_tu_choi_thi_de_tai_ve_GV_TU_CHOI() {
        DeTaiTotNghiep deTai = deTai(2);

        deTai.giangVienTuChoi("GV1", null);
        deTai.giangVienTuChoi("GV2", null);

        assertThat(deTai.getTrangThai()).isEqualTo(TrangThaiDeTai.GV_TU_CHOI);
    }

    @Test
    void test_TD04_moi_giang_vien_chi_cho_y_kien_mot_lan() {
        DeTaiTotNghiep deTai = deTai(2);
        deTai.giangVienDongY("GV1", null);

        assertThatThrownBy(() -> deTai.giangVienTuChoi("GV1", null)).isInstanceOf(IllegalStateException.class);
        assertThat(trangThaiPhan(deTai, "GV1")).isEqualTo(TrangThaiPheDuyetGV.DONG_Y);
    }

    @Test
    void test_TD04_giang_vien_ngoai_danh_sach_khong_duoc_tham_dinh() {
        DeTaiTotNghiep deTai = deTai(2);

        assertThatThrownBy(() -> deTai.giangVienDongY("GV9", null)).isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void test_TD04_nhieu_giang_vien_thi_phai_chi_ro_ma_mot_giang_vien_thi_khong_can() {
        assertThatThrownBy(() -> deTai(2).giangVienDongY(null, null)).isInstanceOf(IllegalArgumentException.class);

        DeTaiTotNghiep motGiangVien = deTai(1);
        motGiangVien.giangVienDongY(null, null);
        assertThat(motGiangVien.getTrangThai()).isEqualTo(TrangThaiDeTai.CHO_BO_MON_DUYET);
    }

    @Test
    void test_TD04_het_vong_cap_1_thi_khong_tham_dinh_duoc_nua() {
        DeTaiTotNghiep deTai = deTai(1);
        deTai.giangVienDongY("GV1", null);

        assertThatThrownBy(() -> deTai.giangVienDongY("GV1", null)).isInstanceOf(IllegalStateException.class);
    }

    @Test
    void test_TD04_giang_vien_con_hieu_luc_khong_gom_nguoi_da_tu_choi() {
        DeTaiTotNghiep deTai = deTai(3);
        deTai.giangVienTuChoi("GV2", null);

        assertThat(deTai.layGiangVienConHieuLuc())
                .extracting(GiangVienHuongDan::getMaGiangVien)
                .containsExactly("GV1", "GV3");
    }
}
