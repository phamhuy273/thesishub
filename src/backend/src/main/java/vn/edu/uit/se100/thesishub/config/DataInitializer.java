package vn.edu.uit.se100.thesishub.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
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
        if (giangVienRepository.count() == 0) {
            GiangVienHuongDan gv1 = new GiangVienHuongDan("ND_GV01", "TS. Nguyễn Văn A", "nva@uit.edu.vn", "0901234567", "GV01", 10);
            GiangVienHuongDan gv2 = new GiangVienHuongDan("ND_GV02", "PGS.TS. Trần Thị B", "ttb@uit.edu.vn", "0902345678", "GV02", 10);
            giangVienRepository.save(gv1);
            giangVienRepository.save(gv2);
        }

        if (sinhVienRepository.count() == 0) {
            SinhVien sv1 = new SinhVien("ND_SV01", "Nguyễn Văn C", "sv.c@uit.edu.vn", "0911223344", "SV01", "KTPM2023");
            SinhVien sv2 = new SinhVien("ND_SV02", "Lê Thị D", "sv.d@uit.edu.vn", "0922334455", "SV02", "KTPM2023");
            SinhVien sv3 = new SinhVien("ND_SV03", "Phạm Văn E", "sv.e@uit.edu.vn", "0933445566", "SV03", "KTPM2023");
            sinhVienRepository.save(sv1);
            sinhVienRepository.save(sv2);
            sinhVienRepository.save(sv3);
        }

        if (deTaiRepository.count() == 0) {
            deTaiService.dangKyDeTai(
                    "DT01",
                    "Xây dựng hệ thống quản lý và xét duyệt đề tài tốt nghiệp ThesisHub",
                    "Hệ thống hỗ trợ sinh viên và giảng viên quản lý quy trình đồ án tốt nghiệp bậc đại học.",
                    "GV01",
                    "SV01",
                    true
            );
        }
    }
}
