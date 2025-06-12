package viosmash.interaction.api.comment;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.interaction.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME,
        path = ApiConstant.RPC_PREFIX + "/comments",
        contextId = "commentApi")
public interface CommentApi {
    String PREFIX = ApiConstant.RPC_PREFIX + "/comments";

    @GetMapping("/count/{postId}")
    int count(@PathVariable("postId") Long objId);

    @GetMapping("/{id}")
    CommentDTO getById(@PathVariable("id") Long id);
}
