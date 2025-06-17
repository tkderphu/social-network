package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.group.enums.GroupRole;

import java.util.List;
import java.util.Optional;

public interface UserMemberGroupRepository extends JpaRepository<UserMemberGroup, Long> {
    @Modifying
    @Query("UPDATE UserMemberGroup u SET u.groupRole = :groupRole\n" +
            "WHERE u.groupId = :groupId AND u.memberId = :memberId")
    void updateRoleMember(Long groupId, Long memberId, GroupRole groupRole);

    UserMemberGroup findByGroupIdAndMemberId(Long groupId, Long memberId);

    void deleteByGroupIdAndMemberId(Long groupId, Long userMemberId);



    @Query("SELECT u.memberId FROM UserMemberGroup u WHERE u.groupId = :groupId")
    List<Long> getAllMember(Long groupId);



    /**
     * Lay toan bo user co role khac #groupRole
     * @param groupId
     * @param groupRole
     * @return
     */
    @Query("SELECT u FROM UserMemberGroup u \n" +
            "WHERE u.groupId = :groupId AND u.groupRole != :groupRole")
    List<UserMemberGroup> getAllMember(Long groupId, GroupRole groupRole);


    @Query("SELECT count(u.memberId) FROM UserMemberGroup u WHERE u.groupId = :groupId")
    int countMember(Long groupId);

    @Query("SELECT u.groupId FROM UserMemberGroup u WHERE u.memberId = :memberId")
    List<Long> getAllGroup(Long memberId);

    Optional<UserMemberGroup> findByGroupIdAndGroupRole(Long groupId, GroupRole groupRole);
}
