package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.chat.enums.Role;
import viosmash.collection.StreamUtils;
import viosmash.controller.conversation.vo.*;
import viosmash.controller.member.vo.MemberConversationRespVO;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.ConversationType;
import viosmash.dal.dataobject.Message;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.exception.ServiceException;
import viosmash.object.BeanUtil;
import viosmash.profile.api.UserApi;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.exception.utils.ServiceUtils.exception;
import static viosmash.object.BeanUtil.copy;

@Slf4j
@RequiredArgsConstructor
@Service
public class ConversationServiceImpl implements ConversationService{

    private final ConversationRepository conversationRepository;
    private final MemberConversationService memberConversationService;
    private final MessageRepository messageRepository;
    private final UserApi userApi;
    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public String createConversation(Long ownerId, ConversationCreateReq req) {
        Conversation conversation = BeanUtil.copy(req, Conversation.class)
                .setCreatedAt(LocalDateTime.now())
                .setConversationType(ConversationType.PUBLIC);

        String conversationId = conversationRepository.save(conversation).getId();
        memberConversationService.invite(conversation.getId(), req.getUserIds(), userId -> {
            if(userId.equals(ownerId)) return Role.OWNER;
            return Role.MEMBER;
        });

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
        Set<Object[]> objects = conversationRepository.findAllByUserId(userId);
        return convertList(objects, list -> {
            Conversation conversation = (Conversation) list[0];
            Message message = (Message)list[1];
            Set<MemberConversationRespVO> members = StreamUtils.filterAndThen(
                    memberConversationService.getListMemberConversationId(conversation.getId()),
                    member -> !member.getId().equals(userId)
            ).collect(Collectors.toSet());

            ConversationRespVO resp = copy(list[0], ConversationRespVO.class)
                    .setLatestMessage(copy(list[1], MessageRespVO.class)
                            .setSender(userApi.getUserById(message.getSenderId())))
                    .setOnline(StreamUtils.anyMatch(members, m -> m.getMember().getIsOnline()));


            if(StringUtils.isEmpty(conversation.getNickname())) {
                resp.setNickname(StringUtils.concat(members, ",", (m) -> {
                    if(conversation.getConversationType() == ConversationType.PRIVATE) {
                        if(m.getMember().getId().equals(SecurityUtils.getLoginUserMemberId() )) return null;
                    }
                    return m.getMember().getFullName();
                }));
            }

            if(StringUtils.isEmpty(conversation.getThumbnail())) {
                resp.setThumbnail(StringUtils.concat(members, ",", (m) -> {
                    if(conversation.getConversationType() == ConversationType.PRIVATE) {
                        if(m.getMember().getId().equals(SecurityUtils.getLoginUserMemberId() )) return null;
                    }
                    return m.getMember().getAvatar();
                }));
            }

            return resp;
        }).stream().toList();
    }

    @Override
    public ConversationRespVO getConversationById(String conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> exception(404, "conversation not found"));

        Set<MemberConversationRespVO> members = StreamUtils.filterAndThen(
                memberConversationService.getListMemberConversationId(conversation.getId()),
                member -> !member.getId().equals(SecurityUtils.getLoginUserMemberId())
        ).collect(Collectors.toSet());
        Message latest = messageRepository.findLatestMessageByConversationId(conversationId).get();
        ConversationRespVO resp = copy(conversation, ConversationRespVO.class)
                .setLatestMessage(copy(latest, MessageRespVO.class)  .setSender(userApi.getUserById(latest.getSenderId())))
                .setOnline(StreamUtils.anyMatch(members, m -> m.getMember().getIsOnline()));

        if(StringUtils.isEmpty(conversation.getNickname())) {
            resp.setNickname(StringUtils.concat(members, ",", (m) -> {
                if(conversation.getConversationType() == ConversationType.PRIVATE) {
                    if(m.getMember().getId().equals(SecurityUtils.getLoginUserMemberId() )) return null;
                }
                return m.getMember().getFullName();
            }));
        }

        if(StringUtils.isEmpty(conversation.getThumbnail())) {
            resp.setThumbnail(StringUtils.concat(members, ",", (m) -> {
                if(conversation.getConversationType() == ConversationType.PRIVATE) {
                    if(m.getMember().getId().equals(SecurityUtils.getLoginUserMemberId() )) return null;
                }
                return m.getMember().getAvatar();
            }));
        }
        return resp;
    }

    @Override
    public String getPrivateConversation(Long userOne, Long userTwo) {
        return this.conversationRepository.findPrivateConversation(userTwo, userTwo);
    }
}
