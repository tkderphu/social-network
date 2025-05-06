package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {


    @Query("SELECT c, a.countVal, (SELECT  COUNT(cn.id)  FROM Comment cn WHERE cn.rootComment.id = c.id) \n" +
            "FROM Comment c INNER JOIN Activity a \n" +
            "ON c.id = a.reactionTypeId AND a.reactionType = viosmash.post.enums.ReactionType.COMMENT \n" +
            "WHERE c.post.id = :postId AND c.rootComment.id IS NULL")
    Page<Object[]> findAllByPostId(@Param("postId") Long postId, Pageable pageable);
}
