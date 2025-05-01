package viosmash.service;

import viosmash.api.UserDTO;

import java.util.Collection;
import java.util.List;

public interface MemberService {
    void leave(Long userId, Long conversationId);
    void kick(Long conversationId, Collection<Long> userIds);
    void invite(Long conversationId, Collection<Long> userIds);
    List<UserDTO> getListMember(Long conversationId);
}
