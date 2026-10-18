package vn.edu.uit.se100.thesishub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import vn.edu.uit.se100.thesishub.domain.GiangVienHuongDan;

@Repository
public interface GiangVienHuongDanRepository extends JpaRepository<GiangVienHuongDan, Long> {

    Optional<GiangVienHuongDan> findByMaGiangVien(String maGiangVien);
}
