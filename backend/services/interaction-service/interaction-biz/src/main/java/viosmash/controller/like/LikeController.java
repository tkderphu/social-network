package viosmash.controller.like;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.like.vo.LikeUpdateReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Like;
import viosmash.interaction.enums.ApiConstant;
import viosmash.pojo.CommonResult;
import viosmash.services.LikeService;

@RequiredArgsConstructor
@RequestMapping(ApiConstant.APP_PREFIX + "/likes")
@RestController
public class LikeController {
    private final LikeService likeService;

    @PutMapping
    @Operation(summary = "Cập nhật like")
    public CommonResult<Boolean> updateLike(@Valid @RequestBody LikeUpdateReqVO req) {
        likeService.updateLike(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(true);
    }

    @GetMapping("/check/{type}/{id}")
    public CommonResult<Boolean> checkLike(@PathVariable("type")Like.ObjectType objectType,
                                           @PathVariable("id") Long objectId) {
        boolean result = likeService.checkLike(SecurityUtils.getLoginUserMemberId(), objectId, objectType);
        return CommonResult.success(result);
    }
}
