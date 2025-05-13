package viosmash.dal.repo;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import viosmash.dal.dataobject.NotifyMessage;

import java.util.List;

public interface NotifyMessageRepository extends JpaRepository<NotifyMessage, Long> {
    List<NotifyMessage> findAllByUserId(Long userId, Sort sort);

    @Modifying
    @Transactional
    @Query(value = "UPDATE NotifyMessage n set n.seen = :read where n.id = :id")
    void updateReadById(@Param("read") Boolean read,@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE NotifyMessage n set n.seen = :read where n.userId = :userId")
    void updateReadByUserId(@Param("read") Boolean read,@Param("userId") Long userId);

    @Query("select count(*) from NotifyMessage n where n.seen = false and n.userId = :userId")
    int countUnreadNotifyByUserId(@Param("userId") Long userId);

    List<NotifyMessage> findAllByUserIdAndSeen(Long userId, boolean seen);
}
