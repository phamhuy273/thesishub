package vn.edu.uit.se100.thesishub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import vn.edu.uit.se100.thesishub.domain.SinhVien;

public interface SinhVienRepository extends JpaRepository<SinhVien, Long> {

    Optional<SinhVien> findByMaSoSinhVien(String maSoSinhVien);
}
