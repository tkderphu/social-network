package viosmash.dal.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.auth.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("UPDATE User u SET u.isOnline = :online WHERE u.id = :userId")
    @Modifying
    void updateUserStatus(@Param("userId") Long userId, @Param("online") Boolean online);
}
