package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService{

    private final UserRepository userRepository;

    @Override
    public List<Long> getListFriends(Long userId) {
        return List.of();
    }

    @Override
    public List<Long> getListMutualFriends(Long userOneId, Long userTwoId) {
        return List.of();
    }

    @Override
    public boolean removeFriend(Long userId, Long targetUserId) {
        return false;
    }

    @Override
    public boolean addNewUserMakeFriendRequest(Long userId, Long targetUserId) {
        return false;
    }

    @Override
    public boolean acceptUserFriendRequest(Long userId, Long targetUserId) {
        return false;
    }

    @Override
    public List<Long> getListUserFriendRequests(Long userId) {
        return List.of();
    }

    @Override
    public List<Long> getListUserFriendRequestsByReceiver(Long userId) {
        return List.of();
    }

    @Override
    public List<Long> getListSuggestionUser(Long userId) {
        return List.of();
    }
}
