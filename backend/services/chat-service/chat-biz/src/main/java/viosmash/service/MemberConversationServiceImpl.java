package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.chat.enums.ConversationPermission;
import viosmash.chat.enums.Role;
import viosmash.controller.member.vo.MemberConversationRespVO;
import viosmash.controller.member.vo.MemberConversationUpdateNotifyReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.MemberConversation;
import viosmash.dal.repo.MemberConversationRepository;
import viosmash.object.BeanUtil;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class MemberConversationServiceImpl implements MemberConversationService {
    private final MemberConversationRepository memberConversationRepository;
    private final UserApi userApi;
    @Override
    @Transactional
    public void leave(Long userId, String conversationId) {
    }

    @Override
    @ConversationPermission(errorMessage = "you can't kick member")
    @Transactional
    public void kick(String conversationId, Collection<Long> userIds) {
        userIds.forEach(userId -> leave(userId, conversationId));
    }

    @Override
    @Transactional
    @ConversationPermission(errorMessage = "conversation policy didn't allow you invite")
    public void invite(String conversationId, Collection<Long> userIds, Function<Long, Role> func) {

        Set<MemberConversation> memberConversations = userIds.stream().map(userId -> {
            return new MemberConversation()
                    .setConversation(new Conversation().setId(conversationId))
                    .setMemberId(userId)
                    .setInvitedByMemberId(SecurityUtils.getLoginUserMemberId())
                    .setRole(func == null ? Role.MEMBER : func.apply(userId))
                    .setInvitedAt(LocalDateTime.now())
                    .setEnablePushNotification(true)
                    .setEnableSoundNotification(true);
        }).collect(Collectors.toSet());

        this.memberConversationRepository.saveAll(memberConversations);
    }

    @Override
    public Set<MemberConversationRespVO> getListMemberConversationId(String conversationId) {
        List<MemberConversation> members = this.memberConversationRepository.findAllByConversationId(conversationId);
        return members.stream().map(mc -> {
            return BeanUtil.copy(userApi.getUserById(mc.getMemberId()), MemberConversationRespVO.class)
                    .setRole(mc.getRole())
                    .setInvitedAt(mc.getInvitedAt())
                    .setInvitedBy(BeanUtil.copy(userApi.getUserById(mc.getInvitedByMemberId()), MemberConversationRespVO.class));

        }).collect(Collectors.toSet());
    }

    @Override
    public MemberConversation getMemberConversation(Long memberId, String conversationId) {
        return this.memberConversationRepository.findByMemberIdAndConversationId(memberId, conversationId)
                .orElseThrow(() -> exception(404, "you haven't joined yet"));
    }

    @Override
    public void updateConversationNotify(MemberConversationUpdateNotifyReqVO req) {
        MemberConversation memberConversation = getMemberConversation(req.getUserId(), req.getConversationId())
                .setEnableSoundNotification(req.getEnableSoundNotification())
                .setEnablePushNotification(req.getEnablePushNotification());

        this.memberConversationRepository.save(memberConversation);
    }
}
