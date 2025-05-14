package viosmash.controller.message;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.chat.enums.ApiConstant;
import viosmash.pojo.CommonResult;
import viosmash.service.MessageService;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Message Controller")
@RequestMapping(ApiConstant.APP_PREFIX + "/messages")
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/chat/send")
    public void createMessage(@Payload MessageCreateReqVO req, Principal principal) {
        log.info("principle: {}", principal);
        req.setSenderId(Long.parseLong(principal.getName()));
        log.info("message: {}", req);
        messageService.createMessage(req);
    }

    @GetMapping("/conversation/{conversationId}")
    @Operation(summary = "get list message in conversation")
    public CommonResult<List<MessageRespVO>> getListMessageByConversation(
            @PathVariable("conversationId") String conversationId,
            @RequestParam(value = "before", required = false, defaultValue = "0") Long beforeMessageId,
            @RequestParam(value = "limit", defaultValue = "20") int limit
    ) {
        return CommonResult.success(messageService.getListMessage(conversationId, beforeMessageId, limit));
    }

}
