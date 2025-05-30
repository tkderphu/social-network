package viosmash.dal.repo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Comment;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.postId = :postId AND c.replyCommentId IS NULL")
    Page<Comment> findAllByPostId(Long postId, Pageable pageable);

    @Query(value = """
            WITH RECURSIVE comment_tree AS (
              SELECT\s
                id, content, media_urls, created_date, user_id,
                reply_comment_id, post_id, down_vote, up_vote,
                id AS root_id
              FROM tbl_comment
              WHERE post_id = :postId AND reply_comment_id IS NULL
            
              UNION ALL
            
              SELECT\s
                c.id, c.content, c.media_urls, c.created_date,c.user_id, 
                c.reply_comment_id, c.post_id,c.down_vote, c.up_vote,
                ct.root_id
              FROM tbl_comment c
              JOIN comment_tree ct ON c.reply_comment_id = ct.id
            )
            SELECT\s
              id, content, media_urls, created_date, user_id,
              reply_comment_id, post_id, down_vote, up_vote,
              COUNT(*) - 1 AS reply_count
            FROM comment_tree
            GROUP BY root_id
            LIMIT :offset, :limit
    """, nativeQuery = true)
    List<Object[]> findAllByPostId(@Param("postId") Long postId,
                                   @Param("limit") int limit,
                                   @Param("offset") int offset);

    @Query(value = """
            WITH RECURSIVE comment_tree AS (
              SELECT\s
                id, content, media_urls, created_date, user_id,
                reply_comment_id, post_id, down_vote, up_vote,
                id AS root_id
              FROM tbl_comment
              WHERE  reply_comment_id = :parentCommentId
            
              UNION ALL
            
              SELECT\s
                c.id, c.content, c.media_urls, c.created_date,c.user_id, 
                c.reply_comment_id, c.post_id,c.down_vote, c.up_vote,
                ct.root_id
              FROM tbl_comment c
              JOIN comment_tree ct ON c.reply_comment_id = ct.id
            )
            SELECT\s
              id, content, media_urls, created_date, user_id,
              reply_comment_id, post_id, down_vote, up_vote,
              COUNT(*) - 1 AS reply_count
            FROM comment_tree
            GROUP BY root_id
            LIMIT :offset, :limit
    """, nativeQuery = true)
    List<Object[]> findAllByParentComment(@Param("parentCommentId") Long parentCommentId,
                                   @Param("limit") int limit,
                                   @Param("offset") int offset);



    int countByPostId(Long postId);




}
