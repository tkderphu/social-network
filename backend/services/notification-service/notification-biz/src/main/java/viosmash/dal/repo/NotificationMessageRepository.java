package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.NotificationMessage;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;

import java.util.Collection;
import java.util.List;

public interface NotificationMessageRepository extends JpaRepository<NotificationMessage, Long> {

    @Query(value = """
        SELECT nf.id, nf.target_type, nf.target_id,
        nf.notification_type, nf.created_at,
        nf.actor_id, nf.user_id, nf.seen, gn.actors
        FROM tbl_notification_message nf INNER JOIN (
            SELECT 
                MAX(n.id) as max_id,
                n.target_type,
                n.target_id,
                n.notification_type,
                COUNT(n.actor_id) - 1 AS actors
            FROM tbl_notification_message n
            WHERE n.user_id = :userId
            GROUP BY  n.target_type, n.target_id, n.notification_type
        ) as gn ON nf.id = gn.max_id
        LIMIT :offset, :limit
        """, nativeQuery = true)
    List<Object[]> findAllByUserId(@Param("userId") Long userId,
                                   @Param("limit") int limit,
                                   @Param("offset") int offset);

    @Query(value = """
        SELECT nf.id, nf.target_type, nf.target_id,
        nf.notification_type, nf.created_at,
        nf.actor_id, nf.user_id, nf.seen, gn.actors
        FROM tbl_notification_message nf INNER JOIN (
            SELECT 
                MAX(n.id) as max_id,
                n.target_type,
                n.target_id,
                n.notification_type,
                COUNT(n.actor_id) - 1 AS actors
            FROM tbl_notification_message n
            WHERE n.user_id = :userId
            GROUP BY  n.target_type, n.target_id, n.notification_type
        ) as gn ON nf.id = gn.max_id
        WHERE nf.seen = :seen
        LIMIT :offset, :limit
        """, nativeQuery = true)
    List<Object[]> findAllByUserIdAndSeen(@Param("userId") Long userId,
                                          @Param("seen") Boolean seen,
                                          @Param("limit") int limit,
                                          @Param("offset") int offset);

    @Query(value = """
        SELECT COUNT(nf.id)
        FROM tbl_notification_message nf INNER JOIN (
            SELECT 
                MAX(n.id) as max_id,
                n.target_type,
                n.target_id,
                n.notification_type,
                COUNT(n.actor_id) - 1 AS actors
            FROM tbl_notification_message n
            WHERE n.user_id = :userId
            GROUP BY  n.target_type, n.target_id, n.notification_type
        ) as gn ON nf.id = gn.max_id
        WHERE nf.seen = false
        """, nativeQuery = true)
    int countUnread(@Param("userId") Long userId);

    @Query("""
            UPDATE NotificationMessage n
            SET n.seen = true
            WHERE n.id = :id    
        """)
    @Modifying
    void updateSeenNotification(@Param("id") Long id);

    @Query("""
            UPDATE NotificationMessage n
            SET n.seen = true
            WHERE n.id IN (:ids) 
        """)
    @Modifying
    void updateAllSeenNotification(@Param("ids")Collection<Long> ids);

    @Modifying
    void deleteAllByTargetIdAndTargetTypeAndNotificationType(Long targetId, TargetType targetType, NotificationType notificationType);
}
