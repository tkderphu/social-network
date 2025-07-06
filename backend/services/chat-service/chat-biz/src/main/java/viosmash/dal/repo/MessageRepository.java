package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Message;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m \n" +
            "where m.id = (select max(x.id) from Message x where x.conversation.id = :conversationId)")
    Optional<Message> findLatestMessageByConversationId(@Param("conversationId") String conversationId);

    @Query(value = "SELECT m.* from tbl_message m WHERE m.conversation_id = :conversationId and \n" +
            "m.id > :beforeMessageId \n" +
            "LIMIT :limit", nativeQuery = true)
    List<Message> findAllByConversationId(@Param("conversationId") String conversationId,
                                          @Param("beforeMessageId") Long beforeMessageId,
                                          @Param("limit") int limit);

    @Query("SELECT m FROM Message m WHERE m.conversation.id = :conversationId")
    List<Message> findAllByConversationId(@Param("conversationId") String conversationId);

    @Query("SELECT COUNT(m) FROM Message m INNER JOIN Conversation c ON m.conversation.id = c.id \n " +
            "WHERE :userId IN (SELECT mc.memberId FROM MemberConversation mc WHERE mc.conversation.id = c.id) AND m.isRead = false")
    int countUnreadMessage(Long userId);
}
