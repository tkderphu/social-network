package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.userId = :userId AND p.groupId IS NULL")
    Page<Post> findAllByUserId(@Param("userId") Long userId, Pageable pageable);
    void deleteAllBySharePostId(Long postId);


    @Query("SELECT p " +
            "FROM Post p \n" +
            "WHERE (p.userId = :authorId) OR (p.userId IN (:recommends) AND p.groupId IS NULL) OR p.groupId IN (:groups)\n" +
            "ORDER BY p.hotScore desc")
    Page<Post> findAll(Long authorId, List<Long> recommends, List<Long> groups, Pageable pageable);


    @Query("UPDATE Post p SET p.votes = :votes WHERE p.id = :postId")
    @Modifying
    void updateVoteByPostId(@Param("postId") Long postId, @Param("votes") int votes);

    Page<Post> findAllByUserIdAndGroupId(Long userId, Long groupId, Pageable createdDate);


    @Query("SELECT p FROM Post p WHERE p.id IN (:ids)")
    Page<Post> findAllByListId(@Param("ids") List<Long> collectionIds, Pageable pageable);

    @Query("UPDATE Post p SET p.visible = :visible WHERE p.id = :id")
    @Modifying
    void updateVisibleById(@Param("id") Long id, @Param("visible") Boolean visible);

    Page<Post> findAllByGroupIdAndVisibleAndDisable(Long groupId, boolean visible, boolean disable, Pageable pageable);

    @Modifying
    @Query("UPDATE Post p SET p.disable = :disable WHERE p.userId = :userId AND groupId = :groupId")
    void updateDisableByUserIdAndGroupId(Long userId, Long groupId, boolean disable);

    @Query("SELECT p " +
            "FROM Post p \n" +
            "WHERE p.visible = true AND p.disable = false AND ((p.userId = :authorId) OR p.groupId IN (:groups))")
    Page<Post> findAll(Long authorId, List<Long> groups, Pageable pageable);
}
