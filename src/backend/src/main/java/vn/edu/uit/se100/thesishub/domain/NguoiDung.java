package vn.edu.uit.se100.thesishub.domain;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@MappedSuperclass
public abstract class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "ma_nguoi_dung", nullable = false)
    protected String maNguoiDung;

    @Column(name = "ho_ten", nullable = false)
    protected String hoTen;

    @Column(name = "email", nullable = false)
    protected String email;

    @Column(name = "so_dien_thoai")
    protected String soDienThoai;

    protected NguoiDung() {}

    public NguoiDung(String maNguoiDung, String hoTen, String email, String soDienThoai) {
        this.maNguoiDung = maNguoiDung;
        this.hoTen = hoTen;
        this.email = email;
        this.soDienThoai = soDienThoai;
    }

    public boolean dangNhap() {
        return this.maNguoiDung != null && !this.maNguoiDung.isBlank();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(String maNguoiDung) {
        this.maNguoiDung = maNguoiDung;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }
}