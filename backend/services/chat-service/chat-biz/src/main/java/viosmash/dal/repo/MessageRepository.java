package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Message;

import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m \n" +
            "where m.id = (select max(x.id) from Message x where x.conversationId = :conversationId)")
    Optional<Message> findLatestMessageByConversationId(@Param("conversationId") Long conversationId);
}
