package viosmash.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import viosmash.api.ProfileApi;
import viosmash.controller.vo.ConversationCreateReq;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Message;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.pojo.PageResult;
import viosmash.service.ConversationService;
import viosmash.service.MessageService;

import java.util.List;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.pojo.CommonResult.success;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ConversationService conversationService;
    private final MessageService messageService;
    private final ProfileApi profileApi;

    @PostMapping("/send")
    public CommonResult<Boolean> sendMessage(@Valid @RequestBody MessageReqVO req) {
        messageService.createMessage(req);
        //send to all instance websocket(redis pub/sub)
        return success(true);
    }

    @PostMapping("/conversations")
    public CommonResult<ConversationRespVO> createConversation(@RequestBody ConversationCreateReq req) {
        return success(conversationService.createConversation(req),
                conversation -> BeanUtil.copy(conversation, ConversationRespVO.class));
    }

    @GetMapping("/conversations/user/{userId}")
    public CommonResult<List<ConversationRespVO>> getListConversation(@PathVariable("userId") Long userId) {
        return null;
//        return success(convertList(
//                conversationService.getListConversation(userId),
//                conversation -> BeanUtil
//                        .copy(conversation, ConversationRespVO.class)
//                        .setLatestMessage(messageService.getLatestMessage(conversation.getId()))
//        ));
    }
    @GetMapping("/conversations/{conversationId}/messages")
    public CommonResult<PageResult<MessageRespVO>> getListMessage(
            @PathVariable("conversationId") Long conversationId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "50") int limit) {
        List<MessageRespVO> messageRespVOS = convertList(
                messageService.getPageMessage(page, limit, conversationId).getData(),
                (message) -> BeanUtil
                        .copy(message, MessageRespVO.class)
                        .setSender(profileApi.getUserById(message.getSenderId()))
        );
        return success(new PageResult<>(
                page, limit, messageRespVOS
        ));
    }


}
