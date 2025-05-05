package viosmash.api.auth;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import viosmash.enums.ApiConstant;


@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX + "/token", contextId = "tokenApi")
public interface TokenApi {

    String PREFIX = ApiConstant.PREFIX + "/token";

    String URL_CHECK = "http://" + ApiConstant.NAME + PREFIX + "/check";

    @PutMapping("/refresh")
    AuthTokenDTO refreshAccessToken(@RequestParam("refreshToken") String refreshToken);

    @GetMapping("/check")
    AuthTokenDTO checkAccessToken(@RequestParam("accessToken") String accessToken);

}
