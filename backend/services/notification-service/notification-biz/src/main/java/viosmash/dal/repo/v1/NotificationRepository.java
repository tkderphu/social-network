package viosmash.dal.repo.v1;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.v1.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {



    Page<Notification> findAllByToUserId(Long toUserId, Pageable pageable);
    Page<Notification> findAllByToUserIdAndIsRead(Long toUserId, Boolean isRead, Pageable pageable);
    int countAllByToUserIdAndIsRead(Long toUserId, Boolean isRead);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.toUserId = :toUserId")
    void updateReadAllByToUserId(@Param("toUserId") Long toUserId);
}
