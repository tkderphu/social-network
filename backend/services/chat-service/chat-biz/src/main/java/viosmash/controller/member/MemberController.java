package viosmash.controller.member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.member.vo.MemberInviteReqVO;
import viosmash.controller.member.vo.MemberRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.chat.enums.ApiConstant;
import viosmash.pojo.CommonResult;
import viosmash.service.MemberService;

import java.util.Collection;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Tag(name = "Member Controller")
@RequestMapping(ApiConstant.APP_PREFIX + "/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    @Operation(summary = "Invite member to conversation")
    public CommonResult<Boolean> invite(@RequestBody MemberInviteReqVO req) {
        memberService.invite(req.getConversationId(), req.getUserIds());
        return CommonResult.success(true);
    }

    @DeleteMapping("/conversation/{conversationId}/kick")
    @Operation(summary = "Kick list member from conversation")
    public CommonResult<Boolean> kick(
            @PathVariable("conversationId") Long conversationId,
            @RequestBody Collection<Long> userIds) {
        memberService.kick(conversationId, userIds);
        return  CommonResult.success(true);
    }

    @DeleteMapping("/conversation/{conversationId}/leave")
    @Operation(summary = "leave conversation by member")
    public CommonResult<Boolean> leave(@PathVariable("conversationId") Long conversationId) {
        memberService.leave(SecurityUtils.getLoginUserMemberId(), conversationId);
        return CommonResult.success(true);
    }

    @GetMapping("/conversation/{conversationId}")
    @Operation(summary = "get list member in conversation")
    public CommonResult<Set<MemberRespVO>> getListMember(
            @PathVariable("conversationId") Long conversationId
    ) {
        return CommonResult.success(memberService.getListMemberConversationId(conversationId));
    }
}
