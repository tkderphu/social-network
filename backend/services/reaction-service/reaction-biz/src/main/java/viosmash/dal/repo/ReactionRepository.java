package viosmash.dal.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import viosmash.dal.dataobject.Reaction;

public interface ReactionRepository extends MongoRepository<Reaction, String> {
}
