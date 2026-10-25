package vn.edu.uit.se100.thesishub.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import vn.edu.uit.se100.thesishub.domain.DeTaiTotNghiep;
import vn.edu.uit.se100.thesishub.domain.TrangThaiDeTai;
import vn.edu.uit.se100.thesishub.dto.DangKyDeTaiRequest;
import vn.edu.uit.se100.thesishub.dto.UngTuyenRequest;
import vn.edu.uit.se100.thesishub.service.DeTaiService;

@RestController
@RequestMapping("/api/de-tai")
@CrossOrigin(origins = "*")
public class DeTaiController {

    private final DeTaiService deTaiService;

    public DeTaiController(DeTaiService deTaiService) {
        this.deTaiService = deTaiService;
    }

    @PostMapping
    public ResponseEntity<DeTaiTotNghiep> dangKyDeTai(@RequestBody DangKyDeTaiRequest req) {
        DeTaiTotNghiep deTai = deTaiService.dangKyDeTai(
                req.getMaDeTai(),
                req.getTenDeTai(),
                req.getMoTa(),
                req.getMaGiangVien(),
                req.getMaSoSinhVien(),
                req.isTimDongDoi()
        );
        return new ResponseEntity<>(deTai, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DeTaiTotNghiep>> layTatCaDeTai() {
        return ResponseEntity.ok(deTaiService.layTatCaDeTai());
    }

    @GetMapping("/{maDeTai}")
    public ResponseEntity<DeTaiTotNghiep> layChiTietDeTai(@PathVariable String maDeTai) {
        return ResponseEntity.ok(deTaiService.layChiTietDeTai(maDeTai));
    }

    @GetMapping("/tim-dong-doi")
    public ResponseEntity<List<DeTaiTotNghiep>> layDeTaiDangTimDongDoi() {
        return ResponseEntity.ok(deTaiService.layDeTaiDangTimDongDoi());
    }

    @GetMapping("/trang-thai/{trangThai}")
    public ResponseEntity<List<DeTaiTotNghiep>> layDeTaiTheoTrangThai(@PathVariable TrangThaiDeTai trangThai) {
        return ResponseEntity.ok(deTaiService.layDeTaiTheoTrangThai(trangThai));
    }

    @PostMapping("/{maDeTai}/ung-tuyen")
    public ResponseEntity<DeTaiTotNghiep> ungTuyenGhepDoi(@PathVariable String maDeTai, @RequestBody UngTuyenRequest req) {
        return ResponseEntity.ok(deTaiService.ungTuyenGhepDoi(maDeTai, req.getMaSoSinhVien()));
    }

    @PutMapping("/{maDeTai}/gv-duyet")
    public ResponseEntity<DeTaiTotNghiep> giangVienDuyet(@PathVariable String maDeTai) {
        return ResponseEntity.ok(deTaiService.giangVienDuyet(maDeTai));
    }

    @PutMapping("/{maDeTai}/gv-tu-choi")
    public ResponseEntity<DeTaiTotNghiep> giangVienTuChoi(@PathVariable String maDeTai) {
        return ResponseEntity.ok(deTaiService.giangVienTuChoi(maDeTai));
    }

    @PutMapping("/{maDeTai}/bo-mon-duyet")
    public ResponseEntity<DeTaiTotNghiep> boMonDuyet(@PathVariable String maDeTai) {
        return ResponseEntity.ok(deTaiService.boMonDuyet(maDeTai));
    }

    @PutMapping("/{maDeTai}/bo-mon-tu-choi")
    public ResponseEntity<DeTaiTotNghiep> boMonTuChoi(@PathVariable String maDeTai) {
        return ResponseEntity.ok(deTaiService.boMonTuChoi(maDeTai));
    }

    @DeleteMapping("/{maDeTai}")
    public ResponseEntity<?> huyDeTai(@PathVariable String maDeTai, @RequestParam(required = false, defaultValue = "SV01") String maSoSinhVien) {
        deTaiService.huyDeTai(maDeTai, maSoSinhVien);
        return ResponseEntity.ok(Map.of("message", "Đã hủy đề xuất đề tài thành công"));
    }
}
