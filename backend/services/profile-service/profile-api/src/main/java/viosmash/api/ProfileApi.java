package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.constant.ApiConstant;

import java.util.Collection;
import java.util.List;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX)
public interface ProfileApi {
    String PREFIX = ApiConstant.PREFIX;

    @GetMapping("/get-all-by-collection-id")
    List<UserDTO> getAllUsers(@RequestBody Collection<Long> ids);

    @GetMapping("/{userId}")
    UserDTO getUserById(@PathVariable("userId") Long userId);

}
