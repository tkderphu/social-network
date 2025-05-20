package viosmash.post.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import viosmash.pojo.CommonResult;
import viosmash.post.enums.ApiConstant;

import java.util.Collection;
import java.util.List;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface PostApi {

    String PREFIX = ApiConstant.RPC_PREFIX;

    @GetMapping("/authors")
    List<PostDTO> getListPostByAuthors(@RequestParam("authorIds") Collection<Long> userIds);
    @GetMapping
    List<PostDTO> getListPostByIds(@RequestParam("postIds") Collection<Long> postIds);
}
