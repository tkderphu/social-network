package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Reaction;
import viosmash.post.enums.ReactionType;

import java.util.List;
import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Optional<Reaction> findByUserIdAndActivityId(Long userId, Long activityId);


    @Query("SELECT r FROM Reaction r INNER JOIN Activity ac \n" +
            "ON r.activity.id = ac.id \n" +
            "WHERE ac.reactionTypeId = :reactionTypeId AND ac.reactionType = :reactionType")
    List<Reaction> findAllByReactionType(@Param("reactionTypeId") Long reactionTypeId,
                                         @Param("reactionType") ReactionType reactionType);
}
