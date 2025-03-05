package viosmash.dal.repository.privacy;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.privacy.UserPost;

import java.util.Optional;

public interface UserPostRepository extends JpaRepository<UserPost, Long> {
    Optional<UserPost> findByUserId(Long userId);
}
