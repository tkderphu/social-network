package viosmash.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.group.api.GroupApi;
import viosmash.pojo.api.group.GroupDTO;

public class GroupApiImpl implements GroupApi {


    @Override
    @GetMapping
    public GroupDTO getGroup(Long groupId) {
        return null;
    }

    @Override
    @GetMapping
    public Boolean existsInGroup(Long groupId, Long userId) {
        return null;
    }


    @PutMapping
    public void updateCoverPhoto(Long groupId, @RequestBody String coverPhotoUrl) {

    }
}
