package viosmash.api.auth;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import viosmash.enums.ApiConstant;
import viosmash.pojo.CommonResult;

@FeignClient(name = ApiConstant.NAME)
public interface TokenApi {

    String PREFIX = ApiConstant.PREFIX + "/token";


    @PutMapping(PREFIX + "/refresh")
    CommonResult<AuthTokenDTO> refreshAccessToken(@RequestParam("refreshToken") String refreshToken);

    @GetMapping(PREFIX + "/check")
    CommonResult<AuthTokenDTO> checkAccessToken(@RequestParam("accessToken") String accessToken);

}
