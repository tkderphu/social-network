package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("SELECT c\n" +
            "FROM Conversation c\n" +
            "WHERE c.type = 'ONE_ONE'\n" +
            "  AND c.id IN (\n" +
            "      SELECT uc.conversationId\n" +
            "      FROM UserConversation uc\n" +
            "      WHERE uc.userId IN (:userOne, :userTwo)\n" +
            "      GROUP BY uc.conversationId\n" +
            "      HAVING COUNT(DISTINCT uc.userId) = 2\n" +
            "  )")
    Conversation findOneBy(@Param("userOne") Long userOne,@Param("userTwo") Long userTwo);
}
