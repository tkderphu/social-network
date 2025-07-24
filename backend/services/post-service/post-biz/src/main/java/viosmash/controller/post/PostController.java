package viosmash.controller.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Post;
import viosmash.group.api.GroupApi;
import viosmash.group.enums.GroupRole;
import viosmash.object.BeanUtil;
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
    public CommonResult<PostRespVO> createPost(@RequestBody PostCreateReqVO req) {
        Post post = postService.createPost(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(BeanUtil.copy(post, PostRespVO.class));
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
    public CommonResult<List<PostRespVO>> getListPost(@PathVariable("id") Long id,
                                                            @PathVariable("type") String type,
                                                            @RequestParam(value = "page", defaultValue = "1") int page,
                                                            @RequestParam(value = "limit", defaultValue = "50") int limit,
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

    /**
     *
     * @param : @currentUserId
     * @param typeNewFeed: newfeed for user or group
     * @param page
     * @param limit
     * @param sort: => 0: hot score, 1: newest
     * @return
     */
    @GetMapping("/{type}/newfeeds")
    public CommonResult<List<PostRespVO>> getNewFeeds(
            @PathVariable("type") String typeNewFeed,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "50") int limit,
            @RequestParam(value = "sort", defaultValue = "0") int sort) {
        List<PostRespVO> newFeeds = postService.getNewFeeds(
                SecurityUtils.getLoginUserMemberId(),
                typeNewFeed,
                page,
                limit,
                sort
        );
        return CommonResult.success(newFeeds);
    }


    @GetMapping("/{id}")
    public CommonResult<PostRespVO> getPostById(@PathVariable("id") Long postId) {
        return CommonResult.success(postService.getPostById(postId));
    }

}
