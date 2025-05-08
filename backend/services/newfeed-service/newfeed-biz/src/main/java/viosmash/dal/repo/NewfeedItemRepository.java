package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import viosmash.dal.dataobject.NewfeedItem;

import java.util.List;

public interface NewfeedItemRepository extends JpaRepository<NewfeedItem, Long> {


    @Query(value = "SELECT * FROM tbl_newfeed_item WHERE userId = :userId \n" +
            "is_read = false \n" +
            "ORDER BY is_advertised DESC, timeline DESC \n" +
            "LIMIT :limit", nativeQuery = true)
    List<NewfeedItem> findAllNewfeedItem(@Param("userId") Long userId, @Param("limit") int limit);

    @Query("UPDATE NewfeedItem n SET n.isRead = true WHERE n.postId = :postId AND n.userId = :userId")
    @Modifying
    void updateIsRead(@Param("postId") Long postId, @Param("userId") Long userId);


    @Modifying
    void deleteByUserIdAndPostId(Long userId, Long postId);

}
