package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.dal.dataobject.User;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.pojo.api.profile.CheckUserReqVO;
import viosmash.profile.api.UserApi;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.service.UserService;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(UserApi.PREFIX)
public class UserApiImpl implements UserApi {

    private final UserService userService;

    @Override
    @GetMapping("/get-by-list")
    public List<UserDTO> getAllUsers(Collection<Long> ids) {
        return null;
    }


    @Override
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable("id") Long userId) {
        return BeanUtil.copy(userService.getProfile(userId), UserDTO.class);
    }

    @Override
    @PutMapping("/{userId}/status")
    public CommonResult<Boolean> updateOnlineStatus(@PathVariable("userId") Long userId,
                                                    @RequestParam("online")Boolean isOnline) {
        userService.updateUserStatus(userId, isOnline);
        return CommonResult.success(true);
    }

    @Override
    @PutMapping("/{userId}/avatar")
    public CommonResult<Boolean> updateAvatar(@PathVariable("userId") Long userId,
                                       @RequestParam("imageUrl") String imageUrl) {
        userService.updateAvatar(userId, imageUrl);
        return CommonResult.success(true);
    }

    @Override
    @PostMapping("/check")
    public CommonResult<UserDTO> checkUser(@RequestBody CheckUserReqVO checkUser) {
        User user = userService.checkUser(checkUser.getEmail(), checkUser.getPassword());
        return CommonResult.success(BeanUtil.copy(user, UserDTO.class));
    }

    @Override
    public List<UserDTO> searchByFullName(String keyword) {
        return List.of();
    }
}
