package viosmash.dal.repo.v1;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.v1.CommentNotification;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface CommentNotificationRepository extends JpaRepository<CommentNotification, Long> {

    @Query("""
            SELECT COUNT(c) FROM CommentNotification c 
            WHERE c.toUserId != :toUserId AND c.postId = :postId AND c.commentId IS NULL
            """)
    int countAllByDifToUserIdAndPostId(Long toUserId, Long postId);

    Optional<CommentNotification> findByPostId(Long postId);

    Optional<CommentNotification> findByCommentId(Long commentId);

    @Query("SELECT COUNT(DISTINCT c.fromUserId) FROM CommentNotification c \n" +
            "WHERE c.commentId = :commentId")
    int countDistinctUserByCommentId(@Param("commentId") Long commentId);

    @Query("SELECT COUNT(DISTINCT c.fromUserId) FROM CommentNotification c \n" +
            "WHERE c.postId = :postId")
    int countDistinctUserByPostId(@Param("postId") Long postId);


}
