package vn.edu.uit.se100.thesishub.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;

/** Một "phần" của đề tài theo TD-04: một giảng viên cùng trạng thái thẩm định riêng của giảng viên đó. */
@Entity
@Table(
    name = "phan_cong_huong_dan",
    uniqueConstraints = @UniqueConstraint(columnNames = {"de_tai_id", "giang_vien_id"})
)
public class PhanCongHuongDan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "de_tai_id", nullable = false)
    private DeTaiTotNghiep deTai;

    @ManyToOne(optional = false)
    @JoinColumn(name = "giang_vien_id", nullable = false)
    private GiangVienHuongDan giangVien;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai_duyet", nullable = false)
    private TrangThaiPheDuyetGV trangThaiDuyet;

    @Column(name = "nhan_xet", columnDefinition = "TEXT")
    private String nhanXet;

    @Column(name = "thoi_diem_phan_hoi")
    private LocalDateTime thoiDiemPhanHoi;

    protected PhanCongHuongDan() {}

    PhanCongHuongDan(DeTaiTotNghiep deTai, GiangVienHuongDan giangVien, TrangThaiPheDuyetGV trangThaiDuyet) {
        this.deTai = deTai;
        this.giangVien = giangVien;
        this.trangThaiDuyet = trangThaiDuyet;
    }

    public void dongY(String yKien) {
        ghiNhanQuyetDinh(TrangThaiPheDuyetGV.DONG_Y, yKien);
    }

    public void tuChoi(String yKien) {
        ghiNhanQuyetDinh(TrangThaiPheDuyetGV.TU_CHOI, yKien);
    }

    private void ghiNhanQuyetDinh(TrangThaiPheDuyetGV quyetDinh, String yKien) {
        if (trangThaiDuyet != TrangThaiPheDuyetGV.CHO_DUYET) {
            throw new IllegalStateException("Giảng viên " + giangVien.getMaGiangVien() + " đã cho ý kiến về đề tài này");
        }
        this.trangThaiDuyet = quyetDinh;
        this.nhanXet = yKien;
        this.thoiDiemPhanHoi = LocalDateTime.now();
    }

    boolean isChoDuyet() {
        return trangThaiDuyet == TrangThaiPheDuyetGV.CHO_DUYET;
    }

    boolean isDongY() {
        return trangThaiDuyet == TrangThaiPheDuyetGV.DONG_Y;
    }

    boolean isTuChoi() {
        return trangThaiDuyet == TrangThaiPheDuyetGV.TU_CHOI;
    }

    public Long getId() {
        return id;
    }

    public GiangVienHuongDan getGiangVien() {
        return giangVien;
    }

    public TrangThaiPheDuyetGV getTrangThaiDuyet() {
        return trangThaiDuyet;
    }

    public String getNhanXet() {
        return nhanXet;
    }

    public LocalDateTime getThoiDiemPhanHoi() {
        return thoiDiemPhanHoi;
    }
}
