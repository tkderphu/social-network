package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.collection.CollUtils;
import viosmash.controller.group.vo.GroupRespVO;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.group.api.GroupApi;
import viosmash.group.enums.GroupRole;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.service.group.GroupService;
import viosmash.service.member.UserMemberGroupService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(GroupApi.PREFIX)
@RequiredArgsConstructor
public class GroupApiImpl implements GroupApi {

    private final GroupService groupService;
    private final UserMemberGroupService userMemberGroupService;
    @Override
    public GroupDTO getGroup(Long groupId) {
        log.info("get group from rpc: {}", groupId);
        return BeanUtil.copy(groupService.getGroup(groupId), GroupDTO.class);
    }

    @Override
    public GroupRole getUserRole(Long groupId, Long userId) {
        UserMemberGroup member = userMemberGroupService.getMember(userId, groupId);
        if(member != null) {
            return member.getGroupRole();
        }
        return null;
    }


    @Override
    public List<Long> getListGroup(Long userId) {
        List<Long> groupIds = CollUtils.convertList(groupService.getListGroupJoined(userId), GroupRespVO::getId);
        log.info("get list group of user - groups: {} - {}", userId, groupIds);

        return groupIds;
    }



    @PutMapping
    public void updateCoverPhoto(Long groupId, @RequestBody String coverPhotoUrl) {

    }
}
