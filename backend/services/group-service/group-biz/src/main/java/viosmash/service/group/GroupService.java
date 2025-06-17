package viosmash.service.group;

import org.springframework.web.multipart.MultipartFile;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.group.enums.GroupType;

import java.util.List;

public interface GroupService {



    Group getGroup(Long id);

    Boolean deleteGroup(Long groupId);

    Long createGroup(Long ownerId, GroupCreateReqVO reqVO);
    Long updateGroup(Long groupId, String name, GroupType groupType, String description);

    List<Group> getListGroupByOwner(Long ownerId);

    void updateDescription(Long groupId, String description);

    void updateNotification(Long groupId, Boolean notification);

    void updateGroupCoverPhoto(Long groupId, String description, MultipartFile file);

}
