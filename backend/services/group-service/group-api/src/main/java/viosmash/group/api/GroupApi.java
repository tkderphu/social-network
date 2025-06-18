package viosmash.group.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.group.enums.ApiConstant;
import viosmash.pojo.api.group.GroupDTO;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface GroupApi {
    String PREFIX = ApiConstant.RPC_PREFIX;
    @GetMapping("/{id}")
    GroupDTO getGroup(@PathVariable("id") Long groupId);

    @GetMapping("/{id}/exists/user/{userId}")
    Boolean existsInGroup(@PathVariable("id") Long groupId,
                          @PathVariable("userId") Long userId);
}
