package viosmash.group.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.group.enums.ApiConstant;
import viosmash.pojo.CommonResult;

import java.util.List;

@FeignClient(name = ApiConstant.NAME)
public interface GroupApi {

    @GetMapping("/{id}")
    GroupDTO getGroup(@PathVariable("id") Long groupId);

    @GetMapping("/{id}/exists/user/{userId}")
    Boolean existsInGroup(@PathVariable("id") Long groupId,
                          @PathVariable("userId") Long userId);
}
