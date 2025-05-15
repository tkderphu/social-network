package viosmash.controller.conversation;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.chat.enums.ApiConstant;
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


    @GetMapping("/{conversationId}")
    public CommonResult<ConversationRespVO> getConversation(@PathVariable("conversationId") String conversationId) {
        return CommonResult.success(conversationService.getConversationById(conversationId));
    }
}
