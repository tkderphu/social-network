package viosmash.service.group;

import viosmash.controller.vo.GroupCreateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.enums.GroupType;

import java.util.List;

public interface GroupService {




    Group getGroup(Long id);

    Boolean deleteGroup(Long groupId);

    Long createGroup(GroupCreateReqVO reqVO);
    Long updateGroup(Long groupId, String name, GroupType groupType);

    List<Group> getListGroup();
}
