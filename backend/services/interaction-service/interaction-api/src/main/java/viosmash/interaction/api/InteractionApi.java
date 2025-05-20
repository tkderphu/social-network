package viosmash.interaction.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.interaction.api.dto.PostStats;
import viosmash.interaction.api.dto.ShareInteractionDto;
import viosmash.interaction.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface InteractionApi {
    String PREFIX = ApiConstant.RPC_PREFIX;

    @GetMapping("/stats/post/{postId}")
    PostStats countInteraction(@PathVariable("postId") Long postId);

}
