package viosmash.dal.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import viosmash.dal.dataobject.FirebaseMessageToken;

import java.util.Optional;

public interface FirebaseMessageTokenRepository extends MongoRepository<FirebaseMessageToken, Long> {
    Optional<FirebaseMessageToken> findByUserId(Long userId);
}
