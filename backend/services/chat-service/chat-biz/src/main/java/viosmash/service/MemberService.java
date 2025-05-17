package viosmash.service;

import viosmash.chat.enums.Role;
import viosmash.controller.member.vo.MemberRespVO;

import java.util.Collection;
import java.util.Set;
import java.util.function.Function;

public interface MemberService {
    void leave(Long userId, String conversationId);
    void kick(String conversationId, Collection<Long> userIds);
    void invite(String conversationId, Collection<Long> userIds, Function<Long, Role> func);
    Set<MemberRespVO> getListMemberConversationId(String conversationId);
}
