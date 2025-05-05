package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p, ac.countVal, \n" +
            "(SELECT COUNT(x.id) FROM Post x WHERE x.sharePost.id = p.id), \n" +
            "(SELECT COUNT(cm.id) FROM Comment cm WHERE cm.post.id = p.id) \n" +
            "FROM Post p INNER JOIN Activity ac \n" +
            "ON p.id = ac.reactionTypeId AND ac.reactionType = viosmash.enums.ReactionType.POST \n" +
            "WHERE p.userId = :userId")
    Page<Object[]> findAllByUserId(@Param("userId") Long userId, Pageable pageable);

    void deleteAllBySharePostId(Long postId);
}
