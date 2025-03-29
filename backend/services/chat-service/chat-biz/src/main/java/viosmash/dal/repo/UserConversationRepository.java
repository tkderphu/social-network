package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.UserConversation;

public interface UserConversationRepository extends JpaRepository<UserConversation, Long> {

}
