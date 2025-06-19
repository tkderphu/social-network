package viosmash.controller.post;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.PostService;

import java.util.List;

@RequestMapping("/api/posts")
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public CommonResult<Boolean> createPost(@RequestBody PostCreateReqVO req) {
        postService.createPost(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(true);
    }

    @GetMapping("/{type}/{id}")
    public CommonResult<List<PostRespVO>> getListPostByUser(@PathVariable("id") Long id,
                                                            @PathVariable("type") String type,
                                                            @RequestParam(value = "page", defaultValue = "1") int page,
                                                            @RequestParam(value = "limit", defaultValue = "20") int limit) {
        if(type.equals("user")) {
            List<PostRespVO> resp = postService.getListPostByUserId(id, page, limit);
            return CommonResult.success(resp);
        } else {
            List<PostRespVO> resp= postService.getListPostByGroupId(id, page, limit, 1);
            return CommonResult.success(resp);
        }
    }

    @GetMapping
    public CommonResult<List<PostRespVO>> getNewfeeds( @RequestParam(value = "page", defaultValue = "1") int page,
                                                       @RequestParam(value = "limit", defaultValue = "20") int limit) {
        return null;
    }

    @GetMapping("/{id}")
    public CommonResult<PostRespVO> getPostById(@PathVariable("id") Long postId) {
        return CommonResult.success(postService.getPostById(postId));
    }

}
