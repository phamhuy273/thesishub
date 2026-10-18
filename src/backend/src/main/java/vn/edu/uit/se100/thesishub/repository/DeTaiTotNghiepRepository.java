package vn.edu.uit.se100.thesishub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
import vn.edu.uit.se100.thesishub.domain.DeTaiTotNghiep;
import vn.edu.uit.se100.thesishub.domain.TrangThaiDeTai;

public interface DeTaiTotNghiepRepository extends JpaRepository<DeTaiTotNghiep, Long> {

    Optional<DeTaiTotNghiep> findByMaDeTai(String maDeTai);

    List<DeTaiTotNghiep> findByTrangThai(TrangThaiDeTai trangThai);

    List<DeTaiTotNghiep> findByDangTimDongDoiTrue();

    List<DeTaiTotNghiep> findByGiangVienHuongDanId(Long giangVienId);
}
