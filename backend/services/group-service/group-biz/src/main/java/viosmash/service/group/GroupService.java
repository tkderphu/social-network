package viosmash.service.group;

import org.springframework.scheduling.annotation.Async;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.controller.group.vo.GroupRespVO;
import viosmash.controller.group.vo.GroupUpdateSettingReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.group.enums.GroupType;
import viosmash.pojo.PageResult;

import java.util.List;

public interface GroupService {



    Group getGroup(Long id);

    Boolean deleteGroup(Long groupId);

    Long createGroup(Long ownerId, GroupCreateReqVO reqVO);
    Long updateGroup(Long groupId, String name, GroupType groupType, String description);


    List<GroupRespVO> getListGroupJoined(Long userId);
    List<Group> getListGroupByOwner(Long ownerId);

    void updateDescription(Long groupId, String description);

    void updateNotification(Long groupId, Boolean notification);

    @Async
    void updateGroupCoverPhoto(Long groupId, String url);

    PageResult<GroupRespVO> search(String keyword, int page, int limit);

    void updateGroupSetting(Long groupId, GroupUpdateSettingReqVO req);

    /**
     * Lay danh sach cac nhom chung cua 2 nguoi dung.
     * Chi lay danh sach cac nhom ma @currentUserId la nguoi kiem duyet/quan ly
     * va @userId la thanh vien
     * @param currentUserId
     * @param userId
     * @param type
     * if(type = 0) => Get common group to ban
     * else if(type =1) => Get common that @userId was banned to unban
     * @return
     */
    List<GroupRespVO> suggestGroupToBanUser(Long currentUserId, Long userId, int type);
}
