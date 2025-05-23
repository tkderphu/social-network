package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.Bookmark;
import viosmash.dal.dataobject.Series;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    @Modifying
    void deleteAllBySeriesId(Long seriesId);

    List<Bookmark> findAllBySeriesId(Long seriesId);
}
