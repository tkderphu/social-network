package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.chat.enums.Role;
import viosmash.collection.CollUtils;
import viosmash.controller.member.vo.MemberRespVO;
import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.dal.dataobject.*;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MemberConversationRepository;
import viosmash.dal.repo.MemberRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.object.BeanUtil;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;


@Service
@Slf4j
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MemberService memberService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Override
    @Transactional
    public void createMessage(MessageCreateReqVO req) {
        Conversation conversation = null;
        Member sender = memberRepository.findById(req.getSenderId()).get();
        if(!StringUtils.isEmpty(req.getConversationId())) {
            conversation = conversationRepository.findById(req.getConversationId()).get();
        }
        else if(!req.getEstablishedConversation()) {
            conversation = new Conversation().setId(req.getConversationId())
                    .setCreatedAt(LocalDateTime.now()).setConversationType(ConversationType.PRIVATE)
                    .setId(req.getConversationId());
            this.conversationRepository.save(conversation);
            assert req.getToUserId() != null;
            memberService.invite(conversation.getId(), List.of(req.getSenderId(), req.getToUserId()));
        }

        Message message = BeanUtil.copy(req, Message.class)
                .setSender(sender)
                .setCreatedAt(LocalDateTime.now())
                .setConversation(conversation);

        this.messageRepository.save(message);

        MessageRespVO resp = BeanUtil.copy(message, MessageRespVO.class);

        conversation.getMemberConversations().forEach(mc -> {
            simpMessagingTemplate.convertAndSend("/topic/chat/user/" + mc.getMember().getId(), resp);
        });
    }


    @Override
    public List<MessageRespVO> getListMessage(String conversationId, Long beforeMessageId, int limit) {
        List<Message> messages = this.messageRepository.findAllByConversationId(conversationId, beforeMessageId, limit);

        return CollUtils.convertList(messages, msg -> {
           return BeanUtil.copy(msg, MessageRespVO.class)
                   .setConversationId(msg.getConversation().getId())
                   .setSender(BeanUtil.copy(msg.getSender(), MemberRespVO.class));
        });
    }
}
