package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByUserId(Long userId, Pageable pageable);
    void deleteAllBySharePostId(Long postId);
}
