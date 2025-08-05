package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.Group;
import viosmash.group.enums.GroupRole;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {

    @Query("SELECT g FROM Group g INNER JOIN UserMemberGroup u ON g.id = u.groupId \n" +
            "WHERE u.memberId = :memberId AND u.groupRole = :groupRole")
    List<Group> findAllGroupJoined(@Param("memberId") Long memberId,
                                   @Param("groupRole")GroupRole groupRole);

    @Query("SELECT g FROM Group g WHERE LOWER(g.name) LIKE CONCAT('%', :keyword, '%')")
    Page<Group> searchByName(@Param("keyword") String keyword, Pageable pageable);

    @Query("UPDATE Group g SET g.ownerId = :memberId WHERE g.id = :groupId")
    @Modifying
    void updateOwnerId(@Param("groupId") Long groupId, @Param("memberId") Long memberId);

    @Query("SELECT g FROM Group g INNER JOIN UserMemberGroup u ON g.id = u.groupId \n" +
            "WHERE u.memberId = :userId AND u.isBanned = false")
    List<Group> findAllGroupJoinedByUserId(@Param("userId") Long userId);

    @Query("SELECT g FROM Group g \n" +
            "WHERE " +
            "EXISTS " +
            "(SELECT 1 FROM UserMemberGroup um WHERE um.groupId = g.id AND um.memberId = :currentUserId AND um.groupRole != viosmash.group.enums.GroupRole.MEMBER) \n" +
            "AND " +
            "EXISTS " +
            "(SELECT 1 FROM UserMemberGroup um WHERE um.groupId = g.id AND um.memberId = :userId AND um.groupRole = viosmash.group.enums.GroupRole.MEMBER)")
    List<Group> suggestGroupToBanUser(Long currentUserId, Long userId);
}
