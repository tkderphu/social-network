package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.Like;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdAndObjectIdAndObjectType(
            Long userId,
            Long objectId,
            Like.ObjectType type
    );

    int countByObjectIdAndObjectType(Long objectId, Like.ObjectType objectType);

    @Modifying
    void deleteAllByObjectIdAndObjectType(Long objectId, Like.ObjectType objectType);
}
