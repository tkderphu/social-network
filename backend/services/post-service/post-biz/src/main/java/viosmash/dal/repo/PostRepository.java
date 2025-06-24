package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Post;

import java.util.List;
import java.util.Objects;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.userId = :userId AND p.groupId IS NULL")
    Page<Post> findAllByUserId(@Param("userId") Long userId, Pageable pageable);
    void deleteAllBySharePostId(Long postId);

    Page<Post> findAllByGroupId(Long id, Pageable pageable);

    @Query("SELECT p " +
            "FROM Post p \n" +
            "WHERE (p.userId = :authorId) OR (p.userId IN (:recommends) AND p.groupId IS NULL) OR p.groupId IN (:groups)\n" +
            "ORDER BY p.hotScore desc")
    Page<Post> findAll(Long authorId, List<Long> recommends, List<Long> groups, Pageable pageable);


    @Query("UPDATE Post p SET p.votes = :votes WHERE p.id = :postId")
    @Modifying
    void updateVoteByPostId(@Param("postId") Long postId, @Param("votes") int votes);
}
