package viosmash.newfeed.api;

import org.springframework.cloud.openfeign.FeignClient;
import viosmash.pojo.CommonResult;
import viosmash.post.api.PostDTO;

@FeignClient
public interface NewfeedApi {

    CommonResult<Boolean> updateNewFeed(PostDTO postDTO);

}
