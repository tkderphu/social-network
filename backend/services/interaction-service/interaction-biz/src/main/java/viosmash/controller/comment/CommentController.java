package viosmash.controller.comment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.comment.vo.CommentUpdateReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Comment;
import viosmash.interaction.enums.ApiConstant;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserDTO;
import viosmash.services.CommentService;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping(ApiConstant.APP_PREFIX + "/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public CommonResult<CommentRespVO> createComment(@Valid @RequestBody CommentCreateReqVO req) {
        CommentRespVO comment = commentService.createComment(SecurityUtils.getLoginUserMemberId(), req);

        return CommonResult.success(comment);
    }

    @PutMapping("/{id}")
    public CommonResult<CommentRespVO> updateComment(@PathVariable("id") Long id,
                                                     @Valid @RequestBody CommentUpdateReqVO req) {
        Comment comment = commentService.updateComment(id, req);

        CommentRespVO resp = BeanUtil.copy(comment, CommentRespVO.class);
        resp.setUser(BeanUtil.copy(SecurityUtils.getLoginUserMember(), UserDTO.class));

        return CommonResult.success(resp);
    }

    @GetMapping("/post/{postId}")
    public CommonResult<PageResult<CommentRespVO>> getPageCommentByPost(
            @PathVariable("postId") Long postId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit
    ) {
        PageResult<CommentRespVO> result = commentService.getPageCommentByPost(
                postId, page, limit
        );
        log.info("fetch ok page comment by post: {}", result);
        return CommonResult.success(result);
    }

    @GetMapping("/root/{commentId}")
    public CommonResult<PageResult<CommentRespVO>> getPageCommentByRootComment(
            @PathVariable("commentId") Long commentId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit
    ) {
        PageResult<CommentRespVO> result = commentService.getPageCommentByParentComment(
                commentId, page, limit
        );
        log.info("fetch ok page comment by root comment: {}", result);
        return CommonResult.success(result);
    }

    @DeleteMapping("/{id}")
    public CommonResult<Boolean> deleteComment(@PathVariable("id") Long id) {
//        commentService.deleteComment(id);
        return CommonResult.success(true);
    }

    @PutMapping("/{id}/down")
    public CommonResult<Boolean> downVote() {
        return null;
    }
    @PutMapping("/{id}/up")
    public CommonResult<Boolean> upVote() {
        return null;
    }
}
