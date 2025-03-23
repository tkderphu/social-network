package viosmash.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient
public interface GroupApi {

    GroupDTO getGroup(@PathVariable("id") Long groupId);
    GroupSettingDTO getSetting(@PathVariable("id") Long groupId);
}
