package viosmash.dal.repository.privacy;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.privacy.UserMessage;

public interface UserMessageRepository extends JpaRepository<UserMessage, Long> {
}
