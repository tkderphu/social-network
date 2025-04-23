package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.UserConversation;

import java.util.List;

public interface UserConversationRepository extends JpaRepository<UserConversation, Long> {
    List<UserConversation> findAllByUserId(Long userId);
}
