package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import viosmash.api.ProfileApi;
import viosmash.controller.vo.UserMakeFriendRequestRespVO;
import viosmash.controller.vo.UserRespVO;
import viosmash.convert.UserConvert;
import viosmash.pojo.CommonResult;
import viosmash.service.FriendshipService;

import java.util.List;

import static viosmash.pojo.CommonResult.success;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/friendship")
public class FriendshipController {
    private final FriendshipService friendshipService;
    private final ProfileApi profileApi;

    @PostMapping("/{userOne}/make-friend-request/{userTwo}")
    public CommonResult<Boolean> makeFriendRequest(@PathVariable("userOne") Long userOne,
                                             @PathVariable("userTwo") Long userTwo) {
        boolean isOke = this.friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);
        return success(isOke);
    }

    @PostMapping("/{userOne}/accept-friend-request/{userTwo}")
    public CommonResult<Boolean> acceptFriendRequest(@PathVariable("userOne") Long userOne,
                                                     @PathVariable("userTwo") Long userTwo) {
        boolean isOke = this.friendshipService.acceptUserFriendRequest(userOne, userTwo);
        return success(isOke);
    }

    @DeleteMapping("/{userOne}/remove-friend/{userTwo}")
    public CommonResult<Boolean> removeFriend(@PathVariable("userOne") Long userOne,
                                              @PathVariable("userTwo") Long userTwo) {
        boolean isOk = this.friendshipService.removeFriend(userOne, userTwo);
        return success(isOk);
    }

    @GetMapping("/get-all-friends-by-{userId}")
    public CommonResult<List<UserRespVO>> getFriends(@PathVariable("userId") Long userId,
                                               @RequestParam(value = "limit", required = false) Integer limit) {
        Long currentUserId = 1L;
        List<Long> friends = friendshipService.getListFriends(userId);
        if(currentUserId.compareTo(userId) == 0) {
            return success(UserConvert.INSTANCE.convert(profileApi.getAllUsers(friends)));
        } else {
            List<UserRespVO> result = friends.stream().map(friend -> {
                List<Long> mutualFriends = this.friendshipService.getListMutualFriends(friend, currentUserId);
                if (CollectionUtils.isEmpty(mutualFriends)) {
                    return UserConvert.INSTANCE.convert(profileApi.getUserById(friend), null);
                } else {
                    return UserConvert.INSTANCE.convert(profileApi.getUserById(friend), profileApi.getAllUsers(mutualFriends));
                }
            }).sorted((s1, s2) -> s2.getMutualFriends().size() - s1.getMutualFriends().size()).toList();
            if(limit != null) {
                result = result.stream().limit(limit).toList();
            }
            return success(result);
        }
    }

    @GetMapping("/get-all-make-friend-requests")
    public CommonResult<List<UserMakeFriendRequestRespVO>> getAllMakeFriendRequests() {
        Long currentUserId = 1L;
        List<UserMakeFriendRequestRespVO> result = friendshipService
                .getListUserFriendRequests(currentUserId)
                .stream()
                .map(friendRequest -> {
            List<Long> mutualFriends = friendshipService.getListMutualFriends(
                    currentUserId,
                    friendRequest.getUser().getId());
            return UserConvert.INSTANCE.convert0(
                    friendRequest,
                    profileApi.getUserById(friendRequest.getUser().getId()),
                    profileApi.getAllUsers(mutualFriends));
        }).toList();
        return success(result);
    }


    @GetMapping("/get-all-make-friend-request-received")
    public CommonResult<List<UserMakeFriendRequestRespVO>> getAllMakeFriendRequestReceived() {
        Long currentUserId = 1L;
        List<UserMakeFriendRequestRespVO> result = friendshipService
                .getListUserFriendRequestsByReceiver(currentUserId)
                .stream()
                .map(make -> {
                    List<Long> mutualFriends = friendshipService.getListMutualFriends(
                            currentUserId,
                            make.getUser().getId());
                    return UserConvert.INSTANCE.convert0(
                            make,
                            profileApi.getUserById(make.getUser().getId()),
                            profileApi.getAllUsers(mutualFriends));
                }).toList();

        return success(result);
    }


    @GetMapping("/suggestion-users")
    public CommonResult<List<UserRespVO>> getSuggestionUsers() {
        Long currentUserId = 1L;
        List<UserRespVO> result = this.friendshipService.getListSuggestionUser(currentUserId)
                .stream().map(userId -> {
                    List<Long> mutualFriends = friendshipService.getListMutualFriends(userId, currentUserId);
                    return UserConvert.INSTANCE.convert(
                            profileApi.getUserById(userId),
                            profileApi.getAllUsers(mutualFriends)
                    );
                }).toList();
        return success(result);
    }
}
