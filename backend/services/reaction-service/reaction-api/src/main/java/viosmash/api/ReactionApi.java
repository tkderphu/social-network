package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import viosmash.enums.ApiConstant;
import viosmash.enums.EntityType;

import java.util.List;

@FeignClient(name = ApiConstant.NAME)
public interface ReactionApi {
    String PREFIX = ApiConstant.PREFIX + "/reaction";




    @GetMapping(PREFIX + "/count/{entityType}/{entityId}")
    int countReaction(@PathVariable("entityType")EntityType entityType,
                      @PathVariable("entityId") Long entityId);

    @GetMapping(PREFIX + "/top3/{entityType}/{entityId}")
    Top3ReactionDTO getTop3Reaction(@PathVariable("entityType")EntityType entityType,
                                          @PathVariable("entityId") Long entityId);

}
