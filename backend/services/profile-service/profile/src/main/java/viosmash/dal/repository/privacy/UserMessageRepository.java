package viosmash.dal.repository.privacy;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.privacy.UserMessage;

import java.util.Optional;

public interface UserMessageRepository extends JpaRepository<UserMessage, Long> {
    Optional<UserMessage> findByUserId(Long userId);
}
