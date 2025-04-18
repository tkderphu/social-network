package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.FirebaseMessageToken;

import java.util.Optional;

public interface FirebaseMessageTokenRepository extends JpaRepository<FirebaseMessageToken, Long> {
    Optional<FirebaseMessageToken> findByUserId(Long userId);
}
