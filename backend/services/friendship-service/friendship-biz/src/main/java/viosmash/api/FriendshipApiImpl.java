package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.service.FriendshipService;

import java.util.List;
@RestController
@RequestMapping("/api/friendship/rpc")
@RequiredArgsConstructor
public class FriendshipApiImpl implements FriendshipApi{

    private final FriendshipService friendshipService;
    private final ProfileApi profileApi;
    @Override
    @GetMapping("/mutual-friends/{userOne}/{userTwo}")
    public List<Long> getListCommonFriends(@PathVariable("userOne") Long userOne,
                                           @PathVariable("userTwo") Long userTwo) {
        return null;
    }

    @Override
    @GetMapping("/friends/{userId}")
    public List<Long> getListFriends(@PathVariable("userId") Long userId,
                                           @RequestParam("limit") Long limit) {
       return null;
    }
}
