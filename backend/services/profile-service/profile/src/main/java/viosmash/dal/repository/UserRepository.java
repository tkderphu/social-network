package viosmash.dal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);

}
