package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Activity;
import viosmash.post.enums.ReactionType;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity findByReactionTypeIdAndReactionType(Long reactionTypeId,
                                                 ReactionType reactionType);
}
