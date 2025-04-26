package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.pojo.CommonResult;
import viosmash.service.MessageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chats/messages")
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/chat/send")
    public void createMessage(@Payload MessageReqVO req) {
        messageService.createMessage(req);
    }

    @GetMapping("/conversation/{conversationId}")
    public CommonResult<List<MessageRespVO>> getListMessageByConversation(
            @PathVariable("conversationId") Long conversationId,
            @RequestParam(value = "before", required = false, defaultValue = "0") Long beforeMessageId,
            @RequestParam(value = "limit", defaultValue = "20") int limit
    ) {
        return CommonResult.success(messageService.getListMessage(conversationId, beforeMessageId, limit));
    }

}
