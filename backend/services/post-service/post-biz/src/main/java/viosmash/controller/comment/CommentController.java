package viosmash.controller.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Comment;
import viosmash.pojo.CommonResult;
import viosmash.pojo.PageResult;
import viosmash.service.CommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    @PostMapping
    public CommonResult<Long> createComment(@RequestBody CommentCreateReqVO req) {
        Comment comment = commentService.createComment(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(comment.getId());
    }

    @GetMapping("/post/{id}")
    public PageResult<CommentRespVO> getPageComment(@PathVariable("id") Long id,
                                                    @RequestParam(value = "limit", defaultValue = "15", required = false) int limit,
                                                    @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        return commentService.getPageCommentRespByPost(id, page, limit);
    }
}
