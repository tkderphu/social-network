package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.friendship.api.UserApi;
import viosmash.friendship.api.UserDTO;
import viosmash.nodes.User;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.repository.UserRepository;
import viosmash.service.FriendshipService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(UserApi.PREFIX)
@RequiredArgsConstructor
public class UserApiImpl implements UserApi {

    private final FriendshipService friendshipService;
    private final UserRepository userRepository;


    @Override
    public CommonResult<Boolean> updateUser(UserDTO userDTO) {
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if(user == null) {
            user = BeanUtil.copy(userDTO, User.class);
        } else {
            BeanUtil.setTargetIfNotNull(user, userDTO);
        }
        userRepository.save(user);
        return CommonResult.success(true);
    }

    @Override
    @GetMapping("/mutual/{userOne}/{userTwo}")
    public Set<Long> getListCommonFriends(
            @PathVariable("userOne") Long userOne,
            @PathVariable("userTwo") Long userTwo) {
        return friendshipService.getListMutualFriends(userOne, userTwo);
    }


    @Override
    @GetMapping("/friends/{userId}")
    public List<Long> getListFriends(@PathVariable("userId") Long userId) {
       return friendshipService.getListFriends(userId);
    }

    @Override
    @GetMapping("/{userId}/recommendation")
    public CommonResult<List<UserDTO>> getListRecommendUser(@PathVariable("userId") Long userId) {
        return null;
    }

}
