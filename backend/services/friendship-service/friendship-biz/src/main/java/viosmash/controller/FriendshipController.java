package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.UserMakeFriendRequestRespVO;
import viosmash.controller.vo.UserRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.friendship.constant.FriendshipStatus;
import viosmash.nodes.UserMakesFriendRequest;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.profile.api.UserApi;
import viosmash.service.FriendshipService;

import java.util.List;
import java.util.Set;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.pojo.CommonResult.success;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/friendship")
public class FriendshipController {
    private final FriendshipService friendshipService;
    private final UserApi userApi;
    @PostMapping("/make/{userId}")
    public CommonResult<Boolean> makeFriendRequest(@PathVariable("userId") Long userId) {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        boolean isOke = this.friendshipService.addNewUserMakeFriendRequest(currentUserId, userId);
        return success(isOke);
    }
    @DeleteMapping("/make/reject/{userId}")
    public CommonResult<Boolean> rejectMakeFriendRequest(@PathVariable("userId") Long userId) {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        boolean isOke = this.friendshipService.rejectMakeFriendRequest(currentUserId, userId);
        return success(isOke);
    }
    @DeleteMapping("/make/{userId}")
    public CommonResult<Boolean> cancelMakeFriendRequest(@PathVariable("userId") Long userId) {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        boolean isOke = this.friendshipService.cancelMakeFriendRequest(currentUserId, userId);
        return success(isOke);
    }
    @GetMapping("/status/{userId}")
    public CommonResult<FriendshipStatus> getStatusFriendship(@PathVariable("userId") Long userId) {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        FriendshipStatus status = this.friendshipService.getStatusFriendship(currentUserId, userId);
        return success(status);
    }

    @PutMapping("/make/accept/{userId}")
    public CommonResult<Boolean> acceptMakeFriendRequest(@PathVariable("userId") Long userId) {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        boolean isOke = this.friendshipService.acceptUserMakeFriendRequest(currentUserId, userId);
        return success(isOke);
    }

    @DeleteMapping("/cancel/{userId}")
    public CommonResult<Boolean> removeFriend(@PathVariable("userId") Long userId) {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        boolean isOk = this.friendshipService.removeFriend(currentUserId, userId);
        return success(isOk);
    }

    @GetMapping("/friends/{userId}")
    public CommonResult<List<UserRespVO>> getFriends(@PathVariable("userId") Long userId) {
        List<Long> friends = friendshipService.getListFriends(userId);
        return success(convertList(friends, friendId -> {
            return BeanUtil.copy(userApi.getUserById(friendId), UserRespVO.class)
                    .setMutualFriends(convertList(friendshipService.getListMutualFriends(userId, friendId), mutualFriendId -> {
                        return BeanUtil.copy(userApi.getUserById(mutualFriendId), UserRespVO.class);
                    }));
        }));
    }

    @GetMapping("/requests")
    public CommonResult<List<UserMakeFriendRequestRespVO>> getAllMakeFriendRequests() {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        Set<UserMakesFriendRequest> requests = friendshipService.getListUserFriendRequests(currentUserId);

        return success(convertList(requests, requestUser -> {
            return (UserMakeFriendRequestRespVO)BeanUtil.copy(userApi.getUserById(requestUser.getUser().getId()), UserMakeFriendRequestRespVO.class)
                    .setSince(requestUser.getSince())
                    .setMutualFriends(convertList(friendshipService.getListMutualFriends(requestUser.getUser().getId(), currentUserId), userId -> {
                        return BeanUtil.copy(userApi.getUserById(userId), UserRespVO.class);
                    }));
        }));
    }


    @GetMapping("/invitations")
    public CommonResult<List<UserMakeFriendRequestRespVO>> getAllInvitation() {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        Set<UserMakesFriendRequest> invitations = friendshipService.getListUserFriendRequestsByReceiver(currentUserId);

        return success(convertList(invitations, userInvite -> {
            return (UserMakeFriendRequestRespVO)BeanUtil.copy(userApi.getUserById(userInvite.getUser().getId()), UserMakeFriendRequestRespVO.class)
                    .setSince(userInvite.getSince())
                    .setMutualFriends(convertList(friendshipService.getListMutualFriends(userInvite.getUser().getId(), currentUserId), userId -> {
                        return BeanUtil.copy(userApi.getUserById(userId), UserRespVO.class);
                    }));
        }));
    }


    @GetMapping("/suggestions")
    public CommonResult<List<UserRespVO>> getSuggestionUsers() {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();

        Set<Long> userIds = friendshipService.getListSuggestionUser(currentUserId);

        return success(convertList(userIds, userId -> {
            return  BeanUtil.copy(userApi.getUserById(userId), UserRespVO.class)
                    .setMutualFriends(convertList(friendshipService.getListMutualFriends(userId, currentUserId), mutualId -> {
                        return BeanUtil.copy(userApi.getUserById(userId), UserRespVO.class);
                    }));
        }));
    }
}
