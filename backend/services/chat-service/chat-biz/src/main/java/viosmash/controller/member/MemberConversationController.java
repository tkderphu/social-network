package viosmash.controller.member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.member.vo.MemberConversationUpdateNotifyReqVO;
import viosmash.controller.member.vo.MemberInviteReqVO;
import viosmash.controller.member.vo.MemberConversationRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.chat.enums.ApiConstant;
import viosmash.dal.dataobject.MemberConversation;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.profile.api.UserApi;
import viosmash.service.MemberConversationService;

import java.util.Collection;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Tag(name = "Member Conversation Controller")
@RequestMapping(ApiConstant.APP_PREFIX + "/members")
public class MemberConversationController {
    private final MemberConversationService memberConversationService;
    private final UserApi userApi;
    @PostMapping
    @Operation(summary = "Invite member to conversation")
    public CommonResult<Boolean> invite(@RequestBody MemberInviteReqVO req) {
        memberConversationService.invite(req.getConversationId(), req.getUserIds(), null);
        return CommonResult.success(true);
    }

    @DeleteMapping("/conversation/{conversationId}/kick")
    @Operation(summary = "Kick list member from conversation")
    public CommonResult<Boolean> kick(
            @PathVariable("conversationId") String conversationId,
            @RequestBody Collection<Long> userIds) {
        memberConversationService.kick(conversationId, userIds);
        return  CommonResult.success(true);
    }

    @DeleteMapping("/conversation/{conversationId}/leave")
    @Operation(summary = "leave conversation by member")
    public CommonResult<Boolean> leave(@PathVariable("conversationId") String conversationId) {
        memberConversationService.leave(SecurityUtils.getLoginUserMemberId(), conversationId);
        return CommonResult.success(true);
    }

    @GetMapping("/conversation/{conversationId}")
    @Operation(summary = "get list member in conversation")
    public CommonResult<Set<MemberConversationRespVO>> getListMemberConversation(
            @PathVariable("conversationId") String conversationId
    ) {
        return CommonResult.success(memberConversationService.getListMemberConversationId(conversationId));
    }

    @GetMapping("/conversation/{conversationId}/detail")
    public CommonResult<MemberConversationRespVO> getDetailMemberConversation(
            @PathVariable("conversationId") String conversationId
    ) {
        MemberConversation mc = memberConversationService.getMemberConversation(
                SecurityUtils.getLoginUserMemberId(),
                conversationId
        );

        MemberConversationRespVO memberResp = BeanUtil.copy(mc, MemberConversationRespVO.class)
                .setRole(mc.getRole())
                .setInvitedAt(mc.getInvitedAt())
                .setMember(BeanUtil.copy(userApi.getUserById(mc.getMemberId()), UserDTO.class))
                .setInvitedBy(BeanUtil.copy(userApi.getUserById(mc.getInvitedByMemberId()), UserDTO.class));
        return CommonResult.success(memberResp);
    }


    @PutMapping("/conversation/notify")
    @Operation(summary = "Update notify about conversation")
    public CommonResult<Boolean> updateMemberConversationNotify(@RequestBody MemberConversationUpdateNotifyReqVO req) {
        memberConversationService.updateConversationNotify(req);
        return CommonResult.success(true);
    }



}
