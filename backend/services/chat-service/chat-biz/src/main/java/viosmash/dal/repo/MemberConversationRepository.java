package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.MemberConversation;

import java.util.List;
import java.util.Set;

public interface MemberConversationRepository extends JpaRepository<MemberConversation, Long> {
    List<MemberConversation> findAllByConversationId(String conversationId);
}
