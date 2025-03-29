package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}
