package viosmash.controller.member;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.member.vo.UpdateBanUserReqVO;
import viosmash.controller.member.vo.MemberWaitingReviewRespVO;
import viosmash.controller.member.vo.UserMemberGroupResp;
import viosmash.controller.member.vo.UserMemberGroupRoleUpdateReq;
import viosmash.group.enums.UserGroupStatus;
import viosmash.pojo.CommonResult;
import viosmash.pojo.PageResult;
import viosmash.service.member.UserMemberGroupService;

import java.util.Collection;
import java.util.List;

import static viosmash.core.utils.SecurityUtils.getLoginUserMemberId;
import static viosmash.pojo.CommonResult.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/group")
public class UserMemberGroupController {
    private final UserMemberGroupService userMemberGroupService;


    @PostMapping("/{groupId}/join")
    public CommonResult<Boolean> requestJoinGroup(@PathVariable("groupId") Long groupId) {
        userMemberGroupService.requestJoinGroup(groupId, getLoginUserMemberId());
        return success(true);
    }

    @PutMapping("/{groupId}/role")
    public CommonResult<Boolean> updateRoleMember(@PathVariable("groupId") Long groupId,
                                                  @RequestBody UserMemberGroupRoleUpdateReq req) {
        return success(userMemberGroupService.updatePermissionToUser(groupId, req.getMemberId(), req.getGroupRole()));
    }

    @GetMapping("/{groupId}")
    public CommonResult<PageResult<UserMemberGroupResp>> getListMembers(@PathVariable("groupId") Long groupId,
                                                                        @RequestParam(value = "page", defaultValue = "1") int page,
                                                                        @RequestParam(value = "limit", defaultValue = "20")int limit) {
        return success(userMemberGroupService.getListMember(groupId, page , limit));
    }


    @PutMapping("/{groupId}/ban")
    public CommonResult<Boolean> banUser(
            @PathVariable("groupId") Long groupId,
            @RequestBody UpdateBanUserReqVO req) {
        Boolean res = userMemberGroupService.banUser(groupId, req);
        return success(res);
    }

    @GetMapping("/{groupId}/ban")
    public CommonResult<List<UserMemberGroupResp>> getListMemberIsBanned(
            @PathVariable("groupId") Long groupId
    ) {
        List<UserMemberGroupResp> userMemberGroups = userMemberGroupService.getListMemberIsBanned(groupId);
        return success(userMemberGroups);
    }

    @PutMapping("/{groupId}/invite")
    public CommonResult<Boolean> inviteUsers(@PathVariable("groupId") Long groupId,
                                             @RequestBody Collection<Long> userIds) {
        Boolean result = userMemberGroupService.inviteUserToGroup(groupId, userIds);
        return success(result);
    }

    @DeleteMapping("/kick/{memberId}")
    public CommonResult<Boolean> kickMember(@PathVariable("groupId") Long groupId,
                                            @PathVariable("memberId") Long userId) {
        userMemberGroupService.kickMember(groupId, userId);
        return success(true);
    }

    @PutMapping("/{groupId}/accept/{userId}")
    public CommonResult<Boolean> acceptMemberJoinGroup(@PathVariable("groupId") Long groupId,
                                                       @PathVariable("userId") Long userId) {
        userMemberGroupService.acceptMemberJoinGroup(groupId, userId);
        return success(true);
    }
    @PutMapping("/{groupId}/cancel/{userId}")
    public CommonResult<Boolean> cancelMemberJoinGroup(@PathVariable("groupId") Long groupId,
                                                       @PathVariable("userId") Long userId) {
        userMemberGroupService.cancelMemberJoinGroup(groupId, userId);
        return success(true);
    }
    @DeleteMapping("/{groupId}/leave")
    public CommonResult<Boolean> leaveGroup(@PathVariable("groupId") Long groupId) {
        userMemberGroupService.leaveGroup(groupId, getLoginUserMemberId());
        return success(true);
    }
    @GetMapping("/{groupId}/include")
    public CommonResult<UserGroupStatus> checkJoinedGroup(@PathVariable("groupId") Long groupId) {
        UserGroupStatus isOk = userMemberGroupService.checkUserJoinedGroup(getLoginUserMemberId(), groupId, false);
        return success(isOk);
    }



    @GetMapping("/{groupId}/pending")
    public CommonResult<List<MemberWaitingReviewRespVO>> getListUserWaitingReview(
            @PathVariable("groupId") Long groupId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "100") int limit
    ) {
        return success(userMemberGroupService.getListRequestAttendGroup(groupId, page, limit));
    }

}
