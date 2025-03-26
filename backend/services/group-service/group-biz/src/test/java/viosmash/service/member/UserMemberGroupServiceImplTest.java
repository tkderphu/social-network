package viosmash.service.member;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import viosmash.BaseTest;
import viosmash.assertion.AssertionUtils;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Group;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.dal.repo.GroupRepository;
import viosmash.dal.repo.UserMemberGroupRepository;
import viosmash.exception.ErrorCode;
import viosmash.random.RandomUtils;

import static viosmash.enums.GroupRole.MEMBER;
import static viosmash.enums.GroupRole.OWNER;

public class UserMemberGroupServiceImplTest extends BaseTest {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserMemberGroupRepository userMemberGroupRepository;
    @Autowired
    private UserMemberGroupService userMemberGroupService;
    @Test
    void getMember() {
        Group group = RandomUtils.randomObject(Group.class).setId(null);
        this.groupRepository.save(group);
        UserMemberGroup memberGroup = RandomUtils.randomObject(UserMemberGroup.class)
                .setId(null).setGroupId(group.getId()).setMemberId(1l);
        userMemberGroupRepository.save(memberGroup);

        UserMemberGroup member = userMemberGroupService.getMember(1l, group.getId());

        AssertionUtils.assertPojoEquals(member, memberGroup);
    }

    @org.junit.jupiter.api.Test
    void getListReviewer() {

    }

    @org.junit.jupiter.api.Test
    void countMember() {
    }

    @org.junit.jupiter.api.Test
    void getListMember() {
    }

    @org.junit.jupiter.api.Test
    void getListGroup() {
    }

    @org.junit.jupiter.api.Test
    void kickMember_whenUserHasRole_MEMBER_thenThrowException() {
        Group group = RandomUtils.randomObject(Group.class).setId(null);
        this.groupRepository.save(group);
        UserMemberGroup member1 = RandomUtils.randomObject(UserMemberGroup.class)
                .setId(null).setGroupId(group.getId()).setGroupRole(MEMBER);
        UserMemberGroup member2 = RandomUtils.randomObject(UserMemberGroup.class)
                .setId(null).setGroupId(group.getId()).setGroupRole(MEMBER);
        userMemberGroupRepository.save(member1);
        userMemberGroupRepository.save(member2);


        Mockito.mockStatic(SecurityUtils.class)
                .when(SecurityUtils::getLoginUserMemberId).thenReturn(member1.getMemberId());

        AssertionUtils.assertException(
                new ErrorCode(HttpStatus.FORBIDDEN.value(), "You can't access to this function"),
                () -> {
                    userMemberGroupService.kickMember(group.getId(), member2.getMemberId());
                }
        );
    }

    @org.junit.jupiter.api.Test
    void kickMember_whenUserHasRole_REVIEWER_thenResponseTrue() {
        Group group = RandomUtils.randomObject(Group.class).setId(null);
        this.groupRepository.save(group);
        UserMemberGroup member1 = RandomUtils.randomObject(UserMemberGroup.class)
                .setId(null).setGroupId(group.getId()).setGroupRole(MEMBER);
        UserMemberGroup owner = RandomUtils.randomObject(UserMemberGroup.class)
                .setId(null).setGroupId(group.getId()).setGroupRole(OWNER);
        userMemberGroupRepository.save(member1);
        userMemberGroupRepository.save(owner);


        Mockito.mockStatic(SecurityUtils.class)
                .when(SecurityUtils::getLoginUserMemberId).thenReturn(owner.getMemberId());

        Boolean b = userMemberGroupService.kickMember(group.getId(), member1.getMemberId());
        Assertions.assertEquals(b, true);
    }

    @org.junit.jupiter.api.Test
    void leaveGroup() {
    }

    @org.junit.jupiter.api.Test
    void updatePermissionToUser() {
    }

    @org.junit.jupiter.api.Test
    void acceptMemberJoinGroup() {
    }

    @org.junit.jupiter.api.Test
    void getListRequestAttendGroup() {
    }
}