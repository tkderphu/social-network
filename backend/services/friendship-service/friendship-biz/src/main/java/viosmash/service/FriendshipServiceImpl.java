package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;
import viosmash.constant.FriendshipStatus;
import viosmash.nodes.Friend;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;
import viosmash.repository.UserRepository;

import java.util.List;
import java.util.Set;

import static viosmash.constant.FriendshipStatus.*;
import static viosmash.exception.utils.ServiceUtils.exception;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService{

    private final UserRepository userRepository;

    @Override
    public List<Long> getListFriends(Long userId) {
        return getUserById(userId).getFriends().stream()
                .map(friend -> friend.getUser().getId())
                .toList();
    }

    @Override
    public List<Long> getListMutualFriends(Long userOneId, Long userTwoId) {
        return userRepository.findAllMutualFriendsByTwoUser(userOneId, userTwoId)
                .stream().map(User::getId).toList();
    }

    @Override
    public boolean removeFriend(Long userId, Long targetUserId) {
        userRepository.removeFriendship(userId, targetUserId);
        return true;
    }

    @Override
    public boolean addNewUserMakeFriendRequest(Long userId, Long targetUserId) {

        User user = getUserById(userId);
        User targetUser = getUserById(targetUserId);

        user.makesNewFriendRequest(targetUser);

        this.userRepository.save(user);
        this.userRepository.save(targetUser);

        return true;
    }

    private User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> exception(404, "user not found"));
    }

    @Override
    public boolean acceptUserFriendRequest(Long userId, Long targetUserId) {
        User user = getUserById(userId);
        User targetUser = getUserById(targetUserId);


        user.acceptFriendRequest(targetUser);

        this.userRepository.save(user);
        this.userRepository.save(targetUser);

        return true;
    }

    @Override
    public Set<UserMakesFriendRequest> getListUserFriendRequests(Long userId) {
        return getUserById(userId).getUserMakesFriendRequests();
    }

    @Override
    public List<UserMakesFriendRequest> getListUserFriendRequestsByReceiver(Long userId) {
        return this.userRepository.findAllReceivedFriendRequests(userId);
    }

    @Override
    public List<Long> getListSuggestionUser(Long userId) {
        return userRepository.suggestionFriendsToUser(userId);
    }

    @Override
    public FriendshipStatus getStatusFriendship(Long fromUserId, Long toUserId) {
        boolean isFriend = this.userRepository.checkFriendStatus(fromUserId, toUserId).isPresent();
        if(isFriend) return FRIEND;
        boolean isMakeFriend = this.userRepository.checkMakeFriendRequest(fromUserId, toUserId).isPresent();
        if(isMakeFriend) return MAKE_FRIEND;
        boolean isReceiveInvitation = this.userRepository.checkMakeFriendRequest(toUserId, fromUserId).isPresent();
        if(isReceiveInvitation) return ACCEPT_FRIEND;

        return NONE;
    }
}
