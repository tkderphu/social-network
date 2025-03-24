package viosmash.service.group;

import viosmash.controller.vo.GroupCreateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.enums.GroupType;

import java.util.List;

public interface GroupService {


    Boolean acceptMemberJoinGroup(Long groupId,
                                  Long memberId);

    Boolean acceptPost(Long groupId,
                       Long postId);


    Boolean deleteGroup(Long groupId);

    Long createGroup(GroupCreateReqVO reqVO);
    Long updateGroup(String name, GroupType groupType);

    List<Group> getListGroup();
}
