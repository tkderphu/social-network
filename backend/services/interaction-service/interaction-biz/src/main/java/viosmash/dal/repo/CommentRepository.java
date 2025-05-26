package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
