package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.chat.enums.ConversationPermission;
import viosmash.chat.enums.Role;
import viosmash.controller.member.vo.MemberRespVO;
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

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{
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
                    .setInvitedAt(LocalDateTime.now());
        }).collect(Collectors.toSet());

        this.memberConversationRepository.saveAll(memberConversations);
    }

    @Override
    public Set<MemberRespVO> getListMemberConversationId(String conversationId) {
        List<MemberConversation> members = this.memberConversationRepository.findAllByConversationId(conversationId);
        return members.stream().map(mc -> {
            return BeanUtil.copy(userApi.getUserById(mc.getMemberId()), MemberRespVO.class)
                    .setRole(mc.getRole())
                    .setInvitedAt(mc.getInvitedAt())
                    .setInvitedBy(BeanUtil.copy(userApi.getUserById(mc.getInvitedByMemberId()), MemberRespVO.class));

        }).collect(Collectors.toSet());
    }


}
