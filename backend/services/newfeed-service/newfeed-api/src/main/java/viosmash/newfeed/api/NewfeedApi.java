package viosmash.newfeed.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.newfeed.enums.ApiConstant;
import viosmash.pojo.CommonResult;
import viosmash.pojo.api.post.PostDTO;

import java.util.Collection;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX_APP)
public interface NewfeedApi {
    String PREFIX = ApiConstant.PREFIX_APP;

    @PutMapping
    CommonResult<Boolean> updateNewFeed(@RequestBody PostDTO postDTO);

    @PutMapping("/user/{userId}/post/{postId}")
    CommonResult<Boolean> updateRead(@PathVariable("postId") Long postId,
                                     @PathVariable("userId") Long userId);
    @PutMapping("/user/{userId}")
    CommonResult<Boolean> updateNewfeed(@PathVariable("userId") Long userId,
                                        @RequestBody Collection<PostDTO> posts);
    @DeleteMapping("/user/{userId}")
    CommonResult<Boolean> deleteNewfeed(@PathVariable("userId") Long userId,
                                        @RequestBody Collection<Long> postIds);

}
