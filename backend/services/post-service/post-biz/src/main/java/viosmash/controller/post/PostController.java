package viosmash.controller.post;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.pojo.CommonResult;
import viosmash.pojo.PageResult;
import viosmash.service.PostService;

@RequestMapping("/api/posts")
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public CommonResult<Boolean> createPost(@RequestBody PostCreateReqVO req) {
        postService.createPost(req);
        return CommonResult.success(true);
    }

    @GetMapping("/user/{id}")
    public PageResult<PostRespVO> getListPostByUser(@PathVariable("id") Long userId,
                                                    @RequestParam(value = "page", defaultValue = "1") int page,
                                                    @RequestParam(value = "limit", defaultValue = "20") int limit) {
        return postService.getListPostByUserId(userId, page, limit);
    }

    @GetMapping("/{id}")
    public CommonResult<PostRespVO> getPostById(@PathVariable("id") Long postId) {
        return CommonResult.success(postService.getPostById(postId));
    }



}
