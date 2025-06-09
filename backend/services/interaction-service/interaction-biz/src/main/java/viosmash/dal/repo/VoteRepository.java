package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.Vote;
import viosmash.interaction.enums.ObjectType;
import viosmash.interaction.enums.VoteType;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserIdAndObjectIdAndObjectType(
            Long userId,
            Long objectId,
            ObjectType type
    );

    int countByObjectIdAndObjectTypeAndVoteType(
            Long objectId,
            ObjectType objectType,
            VoteType voteType);

    @Modifying
    void deleteAllByObjectIdAndObjectType(Long objectId, ObjectType objectType);

    List<Vote> findAllByObjectIdAndObjectType(Long objectId, ObjectType objectType);

}
