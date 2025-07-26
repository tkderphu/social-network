package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Conversation;

import java.util.Set;

public interface ConversationRepository extends JpaRepository<Conversation, String> {


    @Query("SELECT c, me FROM Conversation c INNER JOIN Message me on c.id = me.conversation.id \n" +
            "WHERE c.visible = :visible \n" +
            "AND :userId IN (SELECT mc.memberId FROM MemberConversation mc WHERE mc.conversation.id = c.id) \n" +
            "AND me.id = (SELECT MAX(m.id) FROM Message m WHERE m.conversation.id = c.id) \n" +
            "ORDER BY me.id DESC")
    Set<Object[]> findAllByUserId(@Param("userId") Long userId,@Param("visible") Boolean visible);

    @Query(value = """
        SELECT c.id 
        FROM Conversation c
        WHERE c.conversationType = viosmash.dal.dataobject.ConversationType.PRIVATE
        AND EXISTS (
            SELECT 1
            FROM MemberConversation mc
            WHERE mc.conversation.id = c.id
            AND mc.memberId IN (:userOne, :userTwo)
        )
        AND (
            SELECT COUNT(DISTINCT mc.memberId)
            FROM MemberConversation mc
            WHERE mc.conversation.id = c.id
        ) = 2
    """)
    String findPrivateConversation(@Param("userOne") Long userOne, @Param("userTwo") Long userTwo);


    @Query("""
           select count(c) from Conversation c
           where c.visible = false  and 
           :userId IN (select m.memberId from MemberConversation m where m.conversation.id = c.id) 
    """)
    int countAllUnVisibleConversationByUserId(@Param("userId") Long userId);
}
