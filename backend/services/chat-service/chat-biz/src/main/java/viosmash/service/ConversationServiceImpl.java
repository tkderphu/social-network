package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.controller.conversation.vo.*;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.ConversationType;
import viosmash.dal.dataobject.Member;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.exception.ServiceException;
import viosmash.object.BeanUtil;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.exception.utils.ServiceUtils.exception;
import static viosmash.object.BeanUtil.copy;

@Slf4j
@RequiredArgsConstructor
@Service
public class ConversationServiceImpl implements ConversationService{

    private final ConversationRepository conversationRepository;
    private final MemberService memberService;
    private final MessageRepository messageRepository;
    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public Long createConversation(Long ownerId, ConversationCreateReq req) {
        Conversation conversation = BeanUtil.copy(req, Conversation.class)
                .setCreatedAt(LocalDateTime.now())
                .setConversationType(ConversationType.PUBLIC);

        Long conversationId = conversationRepository.save(conversation).getId();
        memberService.invite(conversation.getId(), req.getUserIds());

        return conversationId;
    }

    @Override
    public void updateNickname(ConversationUpdateNicknameReq req) {

    }

    @Override
    public void updateThumbnail(ConversationUpdateThumbnailReq req) {

    }

    @Override
    public void updatePolicy(ConversationUpdatePolicyReq req) {

    }

    @Override
    public List<ConversationRespVO> getListConversation(Long userId) {
        return convertList(conversationRepository.findAllByUserId(userId), list -> {
            ConversationRespVO resp = copy(list[0], ConversationRespVO.class)
                    .setLatestMessage(copy(list[1], MessageRespVO.class));
            return resp;
        }).stream().toList();
    }

    @Override
    public ConversationRespVO getConversationById(Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> exception(404, "conversation not found"));
        ConversationRespVO resp = copy(conversation, ConversationRespVO.class)
                .setLatestMessage(copy(
                        messageRepository.findLatestMessageByConversationId(conversation.getId()),
                        MessageRespVO.class)
                );
        return resp;
    }
}
