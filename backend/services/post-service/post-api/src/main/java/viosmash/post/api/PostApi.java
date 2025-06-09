package viosmash.post.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import viosmash.pojo.api.post.PostDTO;
import viosmash.pojo.api.post.PostUpdateVote;
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

    @GetMapping("/detail/:id")
    PostDTO getPostById(@PathVariable("id") Long id);

//    void saveSharePost();

}
