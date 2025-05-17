package viosmash.controller.conversation;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.chat.enums.ApiConstant;
import viosmash.controller.conversation.vo.ConversationCreateReq;
import viosmash.controller.conversation.vo.ConversationRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.ConversationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstant.APP_PREFIX + "/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping
    public CommonResult<List<ConversationRespVO>> getListConversation() {
        Long userId = SecurityUtils.getLoginUserMemberId();
        List<ConversationRespVO> conversations = conversationService.getListConversation(userId);
        return CommonResult.success(conversations);
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
}
