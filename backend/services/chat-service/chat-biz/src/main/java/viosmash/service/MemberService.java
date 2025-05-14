package viosmash.service;

import viosmash.controller.member.vo.MemberRespVO;
import viosmash.dal.dataobject.Member;

import java.util.Collection;
import java.util.Set;

public interface MemberService {
    void leave(Long userId, String conversationId);
    void kick(String conversationId, Collection<Long> userIds);
    void invite(String conversationId, Collection<Long> userIds);
    Set<MemberRespVO> getListMemberConversationId(String conversationId);
}
