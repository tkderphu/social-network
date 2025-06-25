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
}
