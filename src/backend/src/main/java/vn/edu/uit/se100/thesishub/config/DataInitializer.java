package vn.edu.uit.se100.thesishub.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import vn.edu.uit.se100.thesishub.domain.GiangVienHuongDan;
import vn.edu.uit.se100.thesishub.domain.SinhVien;
import vn.edu.uit.se100.thesishub.repository.DeTaiTotNghiepRepository;
import vn.edu.uit.se100.thesishub.repository.GiangVienHuongDanRepository;
import vn.edu.uit.se100.thesishub.repository.SinhVienRepository;
import vn.edu.uit.se100.thesishub.service.DeTaiService;

@Component
public class DataInitializer implements CommandLineRunner {

    private final GiangVienHuongDanRepository giangVienRepository;
    private final SinhVienRepository sinhVienRepository;
    private final DeTaiTotNghiepRepository deTaiRepository;
    private final DeTaiService deTaiService;

    public DataInitializer(
            GiangVienHuongDanRepository giangVienRepository,
            SinhVienRepository sinhVienRepository,
            DeTaiTotNghiepRepository deTaiRepository,
            DeTaiService deTaiService
    ) {
        this.giangVienRepository = giangVienRepository;
        this.sinhVienRepository = sinhVienRepository;
        this.deTaiRepository = deTaiRepository;
        this.deTaiService = deTaiService;
    }

    @Override
    public void run(String... args) {
        deTaiService.chuyenDoiDuLieuCu();

        // Thêm theo từng mã để CSDL đã có GV01, GV02 vẫn nhận đủ giảng viên chạy thử đồng hướng dẫn.
        themGiangVienNeuChuaCo("ND_GV01", "TS. Nguyễn Văn A", "nva@uit.edu.vn", "0901234567", "GV01");
        themGiangVienNeuChuaCo("ND_GV02", "PGS.TS. Trần Thị B", "ttb@uit.edu.vn", "0902345678", "GV02");
        themGiangVienNeuChuaCo("ND_GV03", "TS. Lý Văn K", "lvk@uit.edu.vn", "0903456789", "GV03");
        themGiangVienNeuChuaCo("ND_GV04", "TS. Mai Thị L", "mtl@uit.edu.vn", "0904567890", "GV04");
        themGiangVienNeuChuaCo("ND_GV05", "ThS. Đặng Văn M", "dvm@uit.edu.vn", "0905678901", "GV05");
        themGiangVienNeuChuaCo("ND_GV06", "ThS. Bùi Thị N", "btn@uit.edu.vn", "0906789012", "GV06");

        if (sinhVienRepository.count() == 0) {
            sinhVienRepository.save(new SinhVien("ND_SV01", "Nguyễn Văn C", "sv.c@uit.edu.vn", "0911223344", "SV01", "KTPM2023"));
            sinhVienRepository.save(new SinhVien("ND_SV02", "Lê Thị D", "sv.d@uit.edu.vn", "0922334455", "SV02", "KTPM2023"));
            sinhVienRepository.save(new SinhVien("ND_SV03", "Phạm Văn E", "sv.e@uit.edu.vn", "0933445566", "SV03", "KTPM2023"));
            sinhVienRepository.save(new SinhVien("ND_SV04", "Hoàng Văn F", "sv.f@uit.edu.vn", "0944556677", "SV04", "KTPM2023"));
            sinhVienRepository.save(new SinhVien("ND_SV05", "Đỗ Thị G", "sv.g@uit.edu.vn", "0955667788", "SV05", "KTPM2023"));
            sinhVienRepository.save(new SinhVien("ND_SV06", "Vũ Minh H", "sv.h@uit.edu.vn", "0966778899", "SV06", "KTPM2023"));
        }

        if (deTaiRepository.count() == 0) {
            deTaiService.dangKyDeTai(
                    "DT01",
                    "Xây dựng hệ thống quản lý và xét duyệt đề tài tốt nghiệp ThesisHub",
                    "Hệ thống hỗ trợ sinh viên và giảng viên quản lý quy trình đồ án tốt nghiệp bậc đại học.",
                    List.of("GV01"),
                    "SV01",
                    true
            );
        }
    }

    private void themGiangVienNeuChuaCo(String maNguoiDung, String hoTen, String email, String soDienThoai, String maGiangVien) {
        if (giangVienRepository.findByMaGiangVien(maGiangVien).isEmpty()) {
            giangVienRepository.save(new GiangVienHuongDan(maNguoiDung, hoTen, email, soDienThoai, maGiangVien, 10));
        }
    }
}
