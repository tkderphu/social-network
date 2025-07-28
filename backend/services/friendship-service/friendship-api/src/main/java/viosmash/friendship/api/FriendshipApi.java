package viosmash.friendship.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import viosmash.pojo.CommonResult;

import java.util.List;
import java.util.Set;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX + "/users")
public interface FriendshipApi {

    String PREFIX = ApiConstant.PREFIX + "/users";

    @PostMapping
    CommonResult<Boolean> updateUser(@RequestBody UserDTO userDTO);

    @GetMapping("/mutual/{userOne}/{userTwo}")
    Set<Long> getListCommonFriends(@PathVariable("userOne") Long userOne,
                                   @PathVariable("userTwo") Long userTwo);

    @GetMapping("/friends/{userId}")
    List<Long> getListFriends(@PathVariable("userId") Long userId);

    @GetMapping("/{userId}/recommendation")
    List<Long> getListRecommendUser(@PathVariable("userId") Long userId);

    @GetMapping("/{userId}/interaction")
    Set<Long> getListUserCanInteract(@PathVariable("userId") Long userId);

    @GetMapping("/check-friends/{user1}/{user2}")
    Boolean isFriend(@PathVariable("user1") Long senderId, @PathVariable("user2") Long toUserId);
}
