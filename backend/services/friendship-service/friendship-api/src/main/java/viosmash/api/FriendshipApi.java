package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import viosmash.pojo.CommonResult;

import java.util.List;
import java.util.Set;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX)
public interface FriendshipApi {

    String PREFIX = ApiConstant.PREFIX;

    @PostMapping("/{userId}")
    CommonResult<Boolean> updateUser(@PathVariable("userId") Long userId);

    @GetMapping("/mutual/{userOne}/{userTwo}")
    Set<Long> getListCommonFriends(@PathVariable("userOne") Long userOne,
                                   @PathVariable("userTwo") Long userTwo);
    @GetMapping("/friends/{userId}")
    List<Long> getListFriends(@PathVariable("userId") Long userId);


}
