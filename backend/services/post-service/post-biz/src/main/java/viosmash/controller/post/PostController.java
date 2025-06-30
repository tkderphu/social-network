package viosmash.controller.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.group.api.GroupApi;
import viosmash.group.enums.GroupRole;
import viosmash.pojo.CommonResult;
import viosmash.service.PostService;

import java.util.List;

@Slf4j
@RequestMapping("/api/posts")
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final GroupApi groupApi;
    @PostMapping
    public CommonResult<Boolean> createPost(@RequestBody PostCreateReqVO req) {
        postService.createPost(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(true);
    }

    @GetMapping("/user/{userId}/group/{groupId}")
    public CommonResult<List<PostRespVO>> getListPostByUserAndGroup(
            @PathVariable("userId") Long userId,
            @PathVariable("groupId") Long groupId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "100") int limit
    ) {
        return CommonResult.success(postService.getListPostByUserIdAndGroupId(
                userId, groupId, page, limit
        ));
    }


    @PutMapping("/{id}/{visible}")
    public CommonResult<Boolean> handleUpdateVisiblePost(
            @PathVariable("id") Long id,
            @PathVariable("visible") Boolean visible
    ) {
        postService.updateVisiblePost(id, visible);
        return CommonResult.success(true);
    }


    /**
     * Get list post is waiting in group has @groupId
     * @return
     */
    @GetMapping("/waiting/group/{groupId}")
    public CommonResult<List<PostRespVO>> getListPostWaitingInGroup(
            @PathVariable("groupId") Long groupId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "100") int limit
    ) {
        GroupRole roleUserInGroup = groupApi.getUserRole(groupId, SecurityUtils.getLoginUserMemberId());
        if(roleUserInGroup == null || roleUserInGroup == GroupRole.MEMBER) {
            return CommonResult.error("Access denied", 401);
        }
        return CommonResult.success(postService.getListPostPendingInGroup(groupId, page, limit));
    }

    @GetMapping("/{type}/{id}")
    public CommonResult<List<PostRespVO>> getListPostByUser(@PathVariable("id") Long id,
                                                            @PathVariable("type") String type,
                                                            @RequestParam(value = "page", defaultValue = "1") int page,
                                                            @RequestParam(value = "limit", defaultValue = "20") int limit,
                                                            @RequestParam(value = "type", defaultValue = "0") int typeId) {
        if(type.equals("user")) {
            List<PostRespVO> resp = postService.getListPostByUserId(id, page, limit);
            return CommonResult.success(resp);
        } else {
            List<PostRespVO> resp= postService.getListPostByGroupId(id, page, limit, typeId);
            log.info("posts from group: {}", resp);
            return CommonResult.success(resp);
        }
    }

    @GetMapping("/newfeeds")
    public CommonResult<List<PostRespVO>> getNewfeeds( @RequestParam(value = "page", defaultValue = "1") int page,
                                                       @RequestParam(value = "limit", defaultValue = "20") int limit) {
        List<PostRespVO> newFeeds = postService.getNewFeeds(SecurityUtils.getLoginUserMemberId(), page, limit);
        return CommonResult.success(newFeeds);
    }

    @GetMapping("/{id}")
    public CommonResult<PostRespVO> getPostById(@PathVariable("id") Long postId) {
        return CommonResult.success(postService.getPostById(postId));
    }

}
