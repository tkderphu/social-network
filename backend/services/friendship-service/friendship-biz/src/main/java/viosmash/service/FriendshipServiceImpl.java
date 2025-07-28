package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.exception.ServiceException;
import viosmash.friendship.constant.FriendshipStatus;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;
import viosmash.notification.api.NotificationApi;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.repository.UserRepository;

import java.util.*;

import static viosmash.friendship.constant.FriendshipStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService{

    private final UserRepository userRepository;
    private final NotificationApi notificationApi;
    @Override
    public List<Long> getListFriends(Long userId) {
        List<Long> userIds = getUserById(userId).getFriends().stream()
                .map(friend -> friend.getUser().getId())
                .toList();
        return userIds;
    }

    @Override
    public Set<Long> getListMutualFriends(Long userOneId, Long userTwoId) {
        return userRepository.findAllMutualFriendsByTwoUser(userOneId, userTwoId);
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

        Map<String, Object> params = new HashMap<>();
        params.put("fromUserId", user.getId());
        params.put("toUserId", targetUserId);
        NotificationDto notificationDto = new NotificationDto();
//        notificationDto.setProperties(params);
//        notificationDto.setType(NotificationType.CREATED_REQUEST_FRIEND);
//        notificationApi.sendNotification(notificationDto);

        return true;
    }

    private User getUserById(Long userId) {
        Optional<User> optionalUser = this.userRepository.findById(userId);
        if(optionalUser.isEmpty()) {
            User user = new User();
            user.setId(userId);
            this.userRepository.save(user);
            return user;
        }
        return optionalUser.get();
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public boolean acceptUserMakeFriendRequest(Long userId, Long targetUserId) {
        User user = getUserById(userId);
        User targetUser = getUserById(targetUserId);


        boolean result = user.acceptFriendRequest(targetUser);
        this.userRepository.save(user);
        this.userRepository.save(targetUser);
        this.userRepository.removeMakeFriendRequest(targetUserId, userId);


        Map<String, Object> params = new HashMap<>();
        params.put("fromUserId", user.getId());
        params.put("toUserId", targetUserId);
        NotificationDto notificationDto = new NotificationDto();
//        notificationDto.setProperties(params);
//        notificationDto.setType(NotificationType.CREATED_REQUEST_FRIEND);
//        notificationApi.sendNotification(notificationDto);


        return result;
    }

    @Override
    public Set<UserMakesFriendRequest> getListUserFriendRequests(Long userId) {
        return getUserById(userId).getUserMakesFriendRequests();
    }

    @Override
    public Set<UserMakesFriendRequest> getListUserFriendRequestsByReceiver(Long userId) {
        return this.userRepository.findAllReceivedFriendRequests(userId);
    }

    @Override
    public Set<Long> getListSuggestionUser(Long userId) {
        return userRepository.suggestionFriendsToUser(userId);
    }

    @Override
    public Set<Long> getListUserCanInteract(Long userId) {
        return userRepository.findAllUserCanInteract(userId);
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

    @Override
    public boolean cancelMakeFriendRequest(Long fromUserId, Long toUserId) {
        userRepository.removeMakeFriendRequest(fromUserId, toUserId);
        return true;
    }

    @Override
    public boolean rejectMakeFriendRequest(Long userIdReceivedMakeFriendRequest, Long userMadeFriendRequest) {
        userRepository.removeMakeFriendRequest(userMadeFriendRequest, userIdReceivedMakeFriendRequest);
        return true;
    }
}
