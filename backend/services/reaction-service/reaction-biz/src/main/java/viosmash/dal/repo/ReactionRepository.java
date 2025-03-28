package viosmash.dal.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import viosmash.dal.dataobject.Reaction;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;

import java.util.List;

public interface ReactionRepository extends MongoRepository<Reaction, String> {
    List<Reaction> findAllByEntityTypeAndEntityTypeAndReactionType(EntityType entityType, Long entityId, ReactionType reactionType);

    int countAllByEntityTypeAndEntityId(EntityType entityType, Long entityId);
}
