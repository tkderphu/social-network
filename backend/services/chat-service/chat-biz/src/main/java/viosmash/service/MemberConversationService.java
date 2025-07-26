package viosmash.service;

import viosmash.chat.enums.Role;
import viosmash.controller.member.vo.MemberConversationRespVO;
import viosmash.controller.member.vo.MemberConversationUpdateNotifyReqVO;
import viosmash.dal.dataobject.MemberConversation;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

public interface MemberConversationService {
    void leave(Long userId, String conversationId);
    void kick(String conversationId, Collection<Long> userIds);
    void invite(String conversationId, Collection<Long> userIds, Function<Long, Role> func);

    Set<MemberConversationRespVO> getListMemberConversationId(String conversationId);
    List<MemberConversation> getListMemberConversationByConversationId(String conversationId);
    MemberConversation getMemberConversation(Long memberId, String conversationId);

    void updateConversationNotify(MemberConversationUpdateNotifyReqVO req);


}
