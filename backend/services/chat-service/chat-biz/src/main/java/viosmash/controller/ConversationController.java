package viosmash.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Conversation;
import viosmash.pojo.CommonResult;
import viosmash.service.ConversationService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chats/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    @GetMapping("/with/user/{id}")
    public CommonResult<ConversationRespVO> getConversationBetweenUser(@PathVariable("id") Long userId) {
        ConversationRespVO conversationRespVO = conversationService.getConversation(SecurityUtils.getLoginUserMemberId(), userId);
        log.info("conversation: {}", conversationRespVO);
        return CommonResult.success(conversationRespVO);
    }
    @GetMapping("/{id}")
    public CommonResult<ConversationRespVO> getConversationById() {
    return null;
    }
}
