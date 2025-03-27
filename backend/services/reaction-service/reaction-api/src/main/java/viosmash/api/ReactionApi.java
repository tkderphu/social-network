package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import viosmash.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME)
public interface ReactionApi {
    String PREFIX = ApiConstant.PREFIX + "/reaction";
}
