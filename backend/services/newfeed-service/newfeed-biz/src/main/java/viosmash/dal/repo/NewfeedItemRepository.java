package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viosmash.dal.dataobject.NewfeedItem;

public interface NewfeedItemRepository extends JpaRepository<NewfeedItem, Long> {

    @Query("SELECT ni FROM NewfeedItem ni WHERE ni.userId = :userId OR ni.isAdvertised >= 1 \n")
    Page<NewfeedItem> findAllByUserId(Long userId, Pageable pageable);
}
