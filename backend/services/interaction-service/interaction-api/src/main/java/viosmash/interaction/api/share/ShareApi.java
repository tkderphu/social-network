package viosmash.interaction.api.share;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.interaction.enums.ApiConstant;
import viosmash.interaction.enums.ObjectType;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX + "/shares", contextId = "shareApi")
public interface ShareApi {
    String PREFIX = ApiConstant.RPC_PREFIX + "/shares";

    @GetMapping("/count/{postId}")
    int countShare(@PathVariable("postId") Long postId);

    @DeleteMapping("/{postId}")
    void deleteAlSharePost(@PathVariable("postId") Long postId);

}
