package viosmash.dal.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.auth.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
