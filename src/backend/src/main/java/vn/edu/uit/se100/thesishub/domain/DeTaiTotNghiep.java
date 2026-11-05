package vn.edu.uit.se100.thesishub.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.CascadeType;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "de_tai_tot_nghiep")
public class DeTaiTotNghiep {

    public static final int SO_GIANG_VIEN_TOI_DA = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_de_tai", nullable = false, unique = true)
    private String maDeTai;

    @Column(name = "ten_de_tai", nullable = false)
    private String tenDeTai;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    private TrangThaiDeTai trangThai;

    @Column(name = "dang_tim_dong_doi", nullable = false)
    private boolean dangTimDongDoi;

    // Cột của dữ liệu trước TD-04: chỉ đọc để chuyển đổi, đề tài mới để trống.
    @ManyToOne
    @JoinColumn(name = "giang_vien_id")
    private GiangVienHuongDan giangVienCu;

    @OneToMany(mappedBy = "deTai", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<PhanCongHuongDan> danhSachPhanCong = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "de_tai_sinh_vien",
        joinColumns = @JoinColumn(name = "de_tai_id"),
        inverseJoinColumns = @JoinColumn(name = "sinh_vien_id")
    )
    private List<SinhVien> danhSachSinhVien = new ArrayList<>();

    protected DeTaiTotNghiep() {}

    public DeTaiTotNghiep(String maDeTai, String tenDeTai, String moTa, List<GiangVienHuongDan> danhSachGiangVien) {
        if (danhSachGiangVien == null || danhSachGiangVien.isEmpty()) {
            throw new IllegalArgumentException("Đề tài phải có ít nhất 1 giảng viên hướng dẫn");
        }
        this.maDeTai = maDeTai;
        this.tenDeTai = tenDeTai;
        this.moTa = moTa;
        this.trangThai = TrangThaiDeTai.CHO_GV_DONG_Y;
        this.dangTimDongDoi = false;
        this.danhSachSinhVien = new ArrayList<>();
        danhSachGiangVien.forEach(this::themGiangVien);
    }

    public void themGiangVien(GiangVienHuongDan giangVien) {
        if (danhSachPhanCong.size() >= SO_GIANG_VIEN_TOI_DA) {
            throw new IllegalStateException("Mỗi đề tài chỉ có tối đa " + SO_GIANG_VIEN_TOI_DA + " giảng viên hướng dẫn (TD-04)");
        }
        boolean daCo = danhSachPhanCong.stream()
                .anyMatch(pc -> pc.getGiangVien().getMaGiangVien().equals(giangVien.getMaGiangVien()));
        if (daCo) {
            throw new IllegalArgumentException("Giảng viên " + giangVien.getMaGiangVien() + " đã có trong danh sách hướng dẫn của đề tài");
        }
        danhSachPhanCong.add(new PhanCongHuongDan(this, giangVien, TrangThaiPheDuyetGV.CHO_DUYET));
    }

    /** Ghi ý kiến đồng ý của một giảng viên rồi tính lại trạng thái đề tài. Bỏ trống mã chỉ hợp lệ khi đề tài có đúng 1 giảng viên. */
    public void giangVienDongY(String maGiangVien, String yKien) {
        timPhanCongChoThamDinh(maGiangVien).dongY(yKien);
        capNhatKetQuaThamDinhCap1(yKien);
    }

    /** Ghi ý kiến từ chối của một giảng viên, các giảng viên khác không bị ảnh hưởng. Trả về giảng viên vừa từ chối để bên gọi hoàn chỉ tiêu. */
    public GiangVienHuongDan giangVienTuChoi(String maGiangVien, String yKien) {
        PhanCongHuongDan phanCong = timPhanCongChoThamDinh(maGiangVien);
        phanCong.tuChoi(yKien);
        capNhatKetQuaThamDinhCap1(yKien);
        return phanCong.getGiangVien();
    }

    private PhanCongHuongDan timPhanCongChoThamDinh(String maGiangVien) {
        if (trangThai != TrangThaiDeTai.CHO_GV_DONG_Y) {
            throw new IllegalStateException("Trạng thái đề tài không hợp lệ để giảng viên thẩm định");
        }
        if (maGiangVien == null || maGiangVien.isBlank()) {
            if (danhSachPhanCong.size() != 1) {
                throw new IllegalArgumentException("Đề tài có nhiều giảng viên, phải chỉ rõ mã giảng viên thẩm định");
            }
            return danhSachPhanCong.get(0);
        }
        return danhSachPhanCong.stream()
                .filter(pc -> pc.getGiangVien().getMaGiangVien().equals(maGiangVien))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Giảng viên " + maGiangVien + " không hướng dẫn đề tài " + maDeTai));
    }

    // Luật hoàn tất của TD-04: mọi phần đã có ý kiến, ít nhất một đồng ý thì đi tiếp, tất cả từ chối thì đề tài kết thúc.
    private void capNhatKetQuaThamDinhCap1(String yKien) {
        if (danhSachPhanCong.stream().anyMatch(PhanCongHuongDan::isChoDuyet)) {
            return;
        }
        if (danhSachPhanCong.stream().anyMatch(PhanCongHuongDan::isDongY)) {
            chuyenLenBoMon(yKien);
        } else {
            tuChoi(yKien);
        }
    }

    /** Giảng viên còn giữ chỉ tiêu của đề tài này (BR-01): mọi giảng viên trừ người đã từ chối. */
    public List<GiangVienHuongDan> layGiangVienConHieuLuc() {
        return danhSachPhanCong.stream()
                .filter(pc -> !pc.isTuChoi())
                .map(PhanCongHuongDan::getGiangVien)
                .toList();
    }

    /** Dựng phần phân công cho đề tài có từ trước TD-04, không đổi trạng thái đề tài và không đụng chỉ tiêu. Trả về true nếu có chuyển đổi. */
    public boolean chuyenDoiDuLieuCu() {
        if (!danhSachPhanCong.isEmpty() || giangVienCu == null) {
            return false;
        }
        TrangThaiPheDuyetGV trangThaiPhan = switch (trangThai) {
            case CHO_GV_DONG_Y -> TrangThaiPheDuyetGV.CHO_DUYET;
            case GV_TU_CHOI -> TrangThaiPheDuyetGV.TU_CHOI;
            default -> TrangThaiPheDuyetGV.DONG_Y;
        };
        danhSachPhanCong.add(new PhanCongHuongDan(this, giangVienCu, trangThaiPhan));
        return true;
    }

    public void themSinhVien(SinhVien sv) {
        if (this.danhSachSinhVien.size() >= 2) {
            throw new IllegalStateException("Moi de tai toi da chi duoc 2 sinh vien thuc hien");
        }
        this.danhSachSinhVien.add(sv);
        if (this.danhSachSinhVien.size() == 2) { 
            this.dangTimDongDoi = false;
        }
    }

    public void capNhatTrangThai(TrangThaiDeTai trangThaiMoi) {
        this.trangThai = trangThaiMoi;
    }

    private void chuyenLenBoMon(String yKien) {
        this.trangThai = TrangThaiDeTai.CHO_BO_MON_DUYET;
    }

    private void tuChoi(String yKien) {
        this.trangThai = TrangThaiDeTai.GV_TU_CHOI;
    }

    public void boMonPheDuyet(String yKien) {
        this.trangThai = TrangThaiDeTai.DUOC_BAO_VE;
    }

    public void boMonTuChoi(String yKien) {
        this.trangThai = TrangThaiDeTai.BO_MON_TU_CHOI;
    }

    public int getSoLuongSinhVien() {
        return this.danhSachSinhVien != null ? this.danhSachSinhVien.size() : 0;
    }

    public void batTimDongDoi() {
        if (danhSachSinhVien.size() >= 2) {
            throw new IllegalStateException("Nhom da du 2 thanh vien, khong the tim dong doi");
        }
        dangTimDongDoi = true;
    }

    public void tatTimDongDoi() {
        dangTimDongDoi = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaDeTai() {
        return maDeTai;
    }

    public void setMaDeTai(String maDeTai) {
        this.maDeTai = maDeTai;
    }

    public String getTenDeTai() {
        return tenDeTai;
    }

    public void setTenDeTai(String tenDeTai) {
        this.tenDeTai = tenDeTai;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public TrangThaiDeTai getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiDeTai trangThai) {
        this.trangThai = trangThai;
    }

    public boolean isDangTimDongDoi() {
        return dangTimDongDoi;
    }

    public void setDangTimDongDoi(boolean dangTimDongDoi) {
        this.dangTimDongDoi = dangTimDongDoi;
    }

    public List<PhanCongHuongDan> getDanhSachPhanCong() {
        return danhSachPhanCong;
    }

    /** Giữ trường JSON cũ cho client chưa đọc danhSachPhanCong: giảng viên đầu danh sách. */
    public GiangVienHuongDan getGiangVienHuongDan() {
        return danhSachPhanCong.isEmpty() ? giangVienCu : danhSachPhanCong.get(0).getGiangVien();
    }

    public List<SinhVien> getDanhSachSinhVien() {
        return danhSachSinhVien;
    }
}
