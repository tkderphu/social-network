package viosmash.api.vote;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.core.utils.SecurityUtils;
import viosmash.interaction.api.vote.VoteApi;
import viosmash.interaction.enums.ObjectType;
import viosmash.services.VoteService;

@RestController
@RequestMapping(VoteApi.PREFIX)
@RequiredArgsConstructor
public class VoteApiImpl implements VoteApi {
    private final VoteService voteService;

    @Override
    @GetMapping("/count/{objType}/{objId}")
    public int countVote(@PathVariable("objId") Long objId, @PathVariable("objType")ObjectType objType){
        return voteService.count(objId, objType);
    }

    @Override
    @GetMapping("/check/{objType}/{objId}")
    public int checkVote(@PathVariable("objId") Long objId, @PathVariable("objType")ObjectType objType){
        return voteService.checkVote(SecurityUtils.getLoginUserMemberId(), objId, objType);
    }
}
