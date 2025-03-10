package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = ApiConstant.NAME)
public interface FriendshipApi {


    @GetMapping("/{userOne}/{userTwo}")
    List<Long> getListCommonFriends(@PathVariable("userOne") Long userOne,
                                    @PathVariable("userTwo") Long userTwo);
    @GetMapping("/{userId}")
    List<Long> getListFriends(@PathVariable("userId") Long userId,
                              @RequestParam("limit") Long limit);


}
