package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.nodes.User;
import viosmash.pojo.CommonResult;
import viosmash.repository.UserRepository;
import viosmash.service.FriendshipService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(FriendshipApi.PREFIX)
@RequiredArgsConstructor
public class FriendshipApiImpl implements FriendshipApi{

    private final FriendshipService friendshipService;
    private final UserRepository userRepository;

    @Override
    @PostMapping("/{userId}")
    public CommonResult<Boolean> updateUser(@PathVariable("userId") Long userId) {
        userRepository.save(new User(userId));
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

}
