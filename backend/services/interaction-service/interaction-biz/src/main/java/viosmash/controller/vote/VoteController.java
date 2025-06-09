package viosmash.controller.vote;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.vote.vo.VoteUpdateReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Vote;
import viosmash.interaction.enums.ApiConstant;
import viosmash.interaction.enums.ObjectType;
import viosmash.pojo.CommonResult;
import viosmash.services.VoteService;

@Slf4j
@RequiredArgsConstructor
@RequestMapping(ApiConstant.APP_PREFIX + "/votes")
@RestController
public class VoteController {
    private final VoteService voteService;

    @PutMapping
    @Operation(summary = "update vote")
    public CommonResult<Boolean> updateVote(@Valid @RequestBody VoteUpdateReqVO req) {
        voteService.updateVote(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(true);
    }

    @GetMapping("/check/{type}/{id}")
    public CommonResult<Integer> checkVote(@PathVariable("type") ObjectType objectType,
                                           @PathVariable("id") Long objectId) {
        int result = voteService.checkVote(SecurityUtils.getLoginUserMemberId(), objectId, objectType);
        log.info("check like result: {}", result);
            
        return CommonResult.success(result);
    }

    @GetMapping("/scores/{type}/{id}")
    public CommonResult<Integer> countVote(@PathVariable("type") ObjectType objectType,
                                           @PathVariable("id") Long objectId) {
        int result = voteService.count(objectId, objectType);
        log.info("count like result: {}", result);

        return CommonResult.success(result);
    }


}
