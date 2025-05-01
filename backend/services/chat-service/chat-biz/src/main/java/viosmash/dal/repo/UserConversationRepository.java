package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Member;

import java.util.List;

public interface UserConversationRepository extends JpaRepository<Member, Long> {
    List<Member> findAllByUserId(Long userId);

    @Query("SELECT uc.userId from Member uc WHERE uc.conversationId = :id")
    Long[] findAllUserIdByConversationId(@Param("id") Long id);
}
