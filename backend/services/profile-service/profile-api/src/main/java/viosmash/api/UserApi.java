package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import viosmash.constant.ApiConstant;
import viosmash.pojo.CommonResult;

import java.util.Collection;
import java.util.List;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX)
public interface UserApi {
    String PREFIX = ApiConstant.PREFIX;

    @GetMapping("/get-by-list")
    List<UserDTO> getAllUsers(@RequestBody Collection<Long> ids);

    @GetMapping("/{id}")
    UserDTO getUserById(@PathVariable("id") Long userId);


    @PutMapping("/{userId}/status")
    CommonResult<Boolean> updateOnlineStatus(@PathVariable("userId") Long userId,
                                             @RequestParam("online") Boolean isOnline);

    @PutMapping("/{userId}/avatar")
    CommonResult<Boolean> updateAvatar(@PathVariable("userId") Long userId,
                                       @RequestParam("imageUrl") String imageUrl);

    @PostMapping("/check")
    CommonResult<UserDTO> checkUser(@RequestBody CheckUserReqVO checkUser) ;
}
