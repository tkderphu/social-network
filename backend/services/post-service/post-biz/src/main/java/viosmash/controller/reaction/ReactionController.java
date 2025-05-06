package viosmash.controller.reaction;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.reaction.vo.ReactionRespVO;
import viosmash.controller.reaction.vo.ReactionUpdateReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.post.enums.ReactionType;
import viosmash.service.ReactionService;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/reactions")
@RestController
public class ReactionController {
    private final ReactionService reactionService;

    @PutMapping
    public CommonResult<Boolean> updateReaction(@RequestBody ReactionUpdateReqVO req) {
        reactionService.updateReaction(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(true);
    }

    @GetMapping("/{reactionType}/{reactionTypeId}")
    public CommonResult<List<ReactionRespVO>> getListReactions(
            @PathVariable("reactionType")ReactionType reactionType,
            @PathVariable("reactionTypeId") Long reactionTypeId
            ) {
        return CommonResult.success(reactionService.getListReaction(reactionTypeId, reactionType));
    }

}
