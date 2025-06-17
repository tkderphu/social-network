package viosmash.controller.member;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.pojo.CommonResult;
import viosmash.service.member.UserMemberGroupService;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.core.utils.SecurityUtils.getLoginUserMemberId;
import static viosmash.pojo.CommonResult.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups/members")
public class MemberController {
    private final UserMemberGroupService userMemberGroupService;


    @PostMapping("/join/groups/{groupId}")
    public CommonResult<Boolean> requestJoinGroup(@PathVariable("groupId") Long groupId) {
        userMemberGroupService.requestJoinGroup(groupId, getLoginUserMemberId());
        return success(true);
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
    public CommonResult<Boolean> checkJoinedGroup(@PathVariable("groupId") Long groupId) {
        Boolean isOk = userMemberGroupService.checkUserJoinedGroup(getLoginUserMemberId(), groupId);
        return success(isOk);
    }



}
