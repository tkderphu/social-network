package viosmash.group.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.group.enums.ApiConstant;
import viosmash.group.enums.GroupRole;
import viosmash.pojo.api.group.GroupDTO;

import java.util.List;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface GroupApi {
    String PREFIX = ApiConstant.RPC_PREFIX;
    @GetMapping("/{id}")
    GroupDTO getGroup(@PathVariable("id") Long groupId);

    @GetMapping("/{id}/user/{userId}/role")
    GroupRole getUserRole(@PathVariable("id") Long groupId,
                          @PathVariable("userId") Long userId);

    @GetMapping("/member/{memberId}")
    List<Long> getListGroup(@PathVariable("memberId") Long userId);



}
