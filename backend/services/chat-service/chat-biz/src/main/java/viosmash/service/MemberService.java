package viosmash.service;

import viosmash.controller.member.vo.MemberRespVO;
import viosmash.dal.dataobject.Member;

import java.util.Collection;
import java.util.Set;

public interface MemberService {
    void leave(Long userId, Long conversationId);
    void kick(Long conversationId, Collection<Long> userIds);
    void invite(Long conversationId, Collection<Long> userIds);
    Set<MemberRespVO> getListMemberConversationId(Long conversationId);
}
