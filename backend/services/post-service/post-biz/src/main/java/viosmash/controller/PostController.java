package viosmash.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.api.GroupApi;
import viosmash.api.UserApi;
import viosmash.controller.vo.PostCreateReqVO;
import viosmash.controller.vo.PostRespVO;
import viosmash.dal.dataobject.Post;
import viosmash.pojo.CommonResult;
import viosmash.service.PostService;

import java.util.List;

import static viosmash.pojo.CommonResult.success;

@RequestMapping("/api/posts")
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserApi userApi;
    private final GroupApi groupApi;

    @PostMapping
    CommonResult<PostRespVO> createPost(@RequestBody @Valid PostCreateReqVO req) {
        Post post = postService.createPost(req);

        PostRespVO postResp = getPostResp(post);
        return success(postResp);
    }



    @GetMapping("/{id}")
    CommonResult<PostRespVO> getPostById(@PathVariable("id") Long id) {
        Post post = postService.getPostById(id);
        PostRespVO postResp = getPostResp(post);
        return success(postResp);
    }

    @GetMapping("/user/{userId}")
    CommonResult<List<PostRespVO>> getListPostByUserId(@PathVariable("userId") Long userId) {
        List<Post> posts = postService.getListPostByUserId(userId);

        return success(posts.stream().map(this::getPostResp).toList());
    }


    @DeleteMapping("/{id}")
    void deletePost(@PathVariable("id") Long id) {
        postService.deletePost(id);//
        //send to g
    }

    private PostRespVO getPostResp(Post post) {
        return new PostRespVO().setPostType(post.getPostType())
                .setId(post.getId())
                .setUser(userApi.getUserById(post.getUserId()))
                .setContent(post.getContent()).setFileUrls(post.getFileUrls())
                .setImageUrls(post.getImageUrls())
                .setGroup(groupApi.getGroup(post.getGroupId()))
                .setNumberOfShare(postService.countSharePost(post.getId()));
    }

}
