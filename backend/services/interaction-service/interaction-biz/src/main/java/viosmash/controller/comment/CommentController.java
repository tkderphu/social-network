package viosmash.controller.comment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Comment;
import viosmash.interaction.enums.ApiConstant;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.profile.api.UserDTO;
import viosmash.services.CommentService;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiConstant.APP_PREFIX + "/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public CommonResult<CommentRespVO> createComment(@Valid @RequestBody CommentCreateReqVO req) {
        Comment comment = commentService.createComment(SecurityUtils.getLoginUserMemberId(), req);

        CommentRespVO resp = BeanUtil.copy(comment, CommentRespVO.class);
        resp.setUser(BeanUtil.copy(SecurityUtils.getLoginUserMember(), UserDTO.class));

        return CommonResult.success(resp);
    }
}
