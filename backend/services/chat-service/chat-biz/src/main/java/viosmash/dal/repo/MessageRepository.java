package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Query("""
        SELECT COUNT(m)
        FROM Message m
        JOIN MemberConversation cm ON cm.conversation.id = m.conversation.id
        WHERE cm.memberId = :userId AND m.id > COALESCE(cm.lastReadMessageId, 0)
    """)
    long countTotalUnread(@Param("userId") Long userId);

    @Query("""
        SELECT cm.conversation.id, COUNT(m)
        FROM Message m
        JOIN MemberConversation cm ON cm.conversation.id = m.conversation.id
        WHERE cm.memberId = :userId AND m.id > COALESCE(cm.lastReadMessageId, 0)
        GROUP BY cm.conversation.id
    """)
    List<Object[]> countUnreadPerConversation(@Param("userId") Long userId);


    @Modifying
    @Query("""
           UPDATE  MemberConversation mc
           SET mc.lastReadMessageId = (
                SELECT MAX(m.id)
                FROM Message m
                WHERE  m.conversation.id = mc.conversation.id
           )    
           WHERE mc.conversation.id = :conversationId AND mc.memberId = :userId
    """)
    void updateReadMessage(@Param("userId") Long userId, @Param("conversationId") Long conversationId);
}
