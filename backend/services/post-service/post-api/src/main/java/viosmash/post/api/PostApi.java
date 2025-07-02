package viosmash.post.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface PostApi {

    String PREFIX = ApiConstant.RPC_PREFIX;

    @GetMapping("/search/{id}")
    PostDTO getPostById(@PathVariable("id") Long id);



    @PutMapping("/{id}/votes")
    void updateVote(@PathVariable("id") Long id, @RequestBody Integer votes);


    @PutMapping("/user/{userId}/group/{groupId}")
    void updateDisablePostByUserAndGroup(@PathVariable("userId") Long userId,
                                         @PathVariable("postId") Long groupId,
                                         @RequestParam("disable") boolean disable);
}
