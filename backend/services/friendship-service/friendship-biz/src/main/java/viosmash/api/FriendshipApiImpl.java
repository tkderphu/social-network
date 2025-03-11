package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.service.FriendshipService;

import java.util.List;
@RestController
@RequestMapping("/api/friendship/rpc")
@RequiredArgsConstructor
public class FriendshipApiImpl implements FriendshipApi{

    private final FriendshipService friendshipService;

    @Override
    @GetMapping("/mutual-friends/{userOne}/{userTwo}")
    public List<Long> getListCommonFriends(@PathVariable("userOne") Long userOne,
                                           @PathVariable("userTwo") Long userTwo) {
        return friendshipService.getListMutualFriends(userOne, userTwo);
    }

    @Override
    public List<Long> getListFriends(Long userId, Long limit) {
        return friendshipService.getListFriends(limit)
                .stream().limit(limit).toList();
    }
}
