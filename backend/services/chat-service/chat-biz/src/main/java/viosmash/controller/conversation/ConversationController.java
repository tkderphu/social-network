package viosmash.controller.conversation;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.chat.enums.ApiConstant;
import viosmash.controller.conversation.vo.ConversationCreateReq;
import viosmash.controller.conversation.vo.ConversationInfoUpdateReqVO;
import viosmash.controller.conversation.vo.ConversationRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.profile.api.UserApi;
import viosmash.service.ConversationService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstant.APP_PREFIX + "/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping
    public CommonResult<List<ConversationRespVO>> getListConversation(
            @RequestParam(value = "visible", defaultValue = "true") Boolean visible
    ) {
        Long userId = SecurityUtils.getLoginUserMemberId();
        List<ConversationRespVO> conversations = conversationService.getListConversation(userId, visible);
        return CommonResult.success(conversations);
    }


    @PutMapping("/info")
    public CommonResult<Boolean> updateInfo(@RequestBody ConversationInfoUpdateReqVO req) {
        conversationService.updateConversationInfo(req);
        return CommonResult.success(true);
    }

    @PostMapping
    public CommonResult<String> createConversation(@Valid @RequestBody ConversationCreateReq req) {
        String conversationId = conversationService.createConversation(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(conversationId);
    }


    @GetMapping("/{conversationId}")
    public CommonResult<ConversationRespVO> getConversation(@PathVariable("conversationId") String conversationId) {
        return CommonResult.success(conversationService.getConversationById(conversationId));
    }


    @GetMapping("/check/{userId}")
    public CommonResult<String> checkHasEstablishedConversation(
            @PathVariable("userId") Long userId
    ) {
        String conversationId = conversationService.getPrivateConversation(SecurityUtils.getLoginUserMemberId(), userId);
        return CommonResult.success(conversationId);
    }

}
