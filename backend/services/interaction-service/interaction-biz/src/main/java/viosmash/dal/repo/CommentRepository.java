package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viosmash.dal.dataobject.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.postId = :postId AND c.replyCommentId IS NULL")
    Page<Comment> findAllByPostId(Long postId, Pageable pageable);
    List<Comment> findAllByRootCommentId(Long rootCommentId);

    Page<Comment> findAllByRootCommentId(Long rootCommentId, Pageable pageable);
    int countByRootCommentId(Long rootCommentId);
}
