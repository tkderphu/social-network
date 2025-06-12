package viosmash.interaction.api.vote;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.interaction.enums.ApiConstant;
import viosmash.interaction.enums.ObjectType;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX + "/votes", contextId = "voteApi")
public interface VoteApi {
    String PREFIX = ApiConstant.RPC_PREFIX + "/votes";

    @GetMapping("/count/{objType}/{objId}")
    int countVote(@PathVariable("objId") Long objId, @PathVariable("objType")ObjectType objType);

    @GetMapping("/check/{objType}/{objId}")
    int checkVote(@PathVariable("objId") Long objId, @PathVariable("objType")ObjectType objType);

    @GetMapping("/{id}")
    VoteDTO getById(@PathVariable("id") Long id);
}
