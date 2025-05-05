package viosmash.chat.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.chat.enums.ApiConstant;
import viosmash.pojo.CommonResult;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX_RPC)
public interface UserApi {
    String PREFIX = ApiConstant.PREFIX_RPC;

    @PutMapping("/members")
    CommonResult<Boolean> updateUserInfo(@RequestBody UserDTO userDTO);
}
