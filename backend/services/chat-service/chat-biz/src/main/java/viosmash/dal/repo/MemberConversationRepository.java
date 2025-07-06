package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import viosmash.dal.dataobject.MemberConversation;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberConversationRepository extends JpaRepository<MemberConversation, Long> {
    List<MemberConversation> findAllByConversationId(String conversationId);

//    @Modifying
//    @Query("UPDATE MemberConversation m SET m.enableNotification = :enable \n" +
//            "WHERE m.memberId = :userId AND m.conversation.id = :conversationId")
    Optional<MemberConversation> findByMemberIdAndConversationId(Long userId, String conversationId);
}
