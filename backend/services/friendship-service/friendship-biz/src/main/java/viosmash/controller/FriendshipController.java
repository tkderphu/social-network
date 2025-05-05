package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.UserMakeFriendRequestRespVO;
import viosmash.controller.post.vo.UserRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.friendship.constant.FriendshipStatus;
import viosmash.pojo.CommonResult;
import viosmash.service.FriendshipService;

import java.util.List;

import static viosmash.pojo.CommonResult.success;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/friendship")
public class FriendshipController {
    private final FriendshipService friendshipService;

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

    @GetMapping("/get-friends/{userId}")
    public CommonResult<List<UserRespVO>> getFriends(@PathVariable("userId") Long userId,
                                               @RequestParam(value = "limit", required = false) Integer limit) {
        return null;
    }

    @GetMapping("/get-requests")
    public CommonResult<List<UserMakeFriendRequestRespVO>> getAllMakeFriendRequests() {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        return null;
    }


    @GetMapping("/receive-invitations")
    public CommonResult<List<UserMakeFriendRequestRespVO>> getAllMakeFriendRequestReceived() {
        Long currentUserId = SecurityUtils.getLoginUserMemberId();
        return null;
    }


    @GetMapping("/suggestion-users")
    public CommonResult<List<UserRespVO>> getSuggestionUsers() {
        Long currentUserId = 1L;
       return null;
    }
}
