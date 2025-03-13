package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collection;
import java.util.List;

@FeignClient
public interface ProfileApi {

    @GetMapping("/get-all-by-collection-id")
    List<UserDTO> getAllUsers(@RequestBody Collection<Long> ids);
    @GetMapping
    UserDTO getUserById(@PathVariable("userId") Long userId);

}
