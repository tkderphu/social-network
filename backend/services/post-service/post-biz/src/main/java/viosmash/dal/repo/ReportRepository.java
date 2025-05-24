package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
