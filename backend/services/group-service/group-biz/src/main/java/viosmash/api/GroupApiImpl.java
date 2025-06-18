package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import viosmash.dal.dataobject.Group;
import viosmash.group.api.GroupApi;
import viosmash.notification.api.NotificationApi;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.service.group.GroupService;

@Slf4j
@RestController
@RequestMapping(GroupApi.PREFIX)
@RequiredArgsConstructor
public class GroupApiImpl implements GroupApi {

    private final GroupService groupService;

    @Override
    public GroupDTO getGroup(Long groupId) {
        log.info("get group from rpc: {}", groupId);
        return BeanUtil.copy(groupService.getGroup(groupId), GroupDTO.class);
    }

    @Override
    public Boolean existsInGroup(Long groupId, Long userId) {
        return null;
    }


    @PutMapping
    public void updateCoverPhoto(Long groupId, @RequestBody String coverPhotoUrl) {

    }
}
