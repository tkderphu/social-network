package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Series;

import java.util.List;

public interface SeriesRepository extends JpaRepository<Series, Long> {
    @Query("SELECT s, (SELECT COUNT(b.id) FROM Bookmark b WHERE b.seriesId = s.id) \n " +
            "FROM Series s WHERE s.userId = :userId")
    List<Object[]> findAllByUserId(@Param("userId") Long userId);
}
