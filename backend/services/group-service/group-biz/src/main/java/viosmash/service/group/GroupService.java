package viosmash.service.group;

import org.springframework.web.multipart.MultipartFile;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.controller.group.vo.GroupRespVO;
import viosmash.controller.group.vo.GroupUpdateSettingReqVO;
import viosmash.core.utils.LoginUser;
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

    void updateGroupCoverPhoto(Long groupId, String description, MultipartFile file);

    PageResult<GroupRespVO> search(String keyword, int page, int limit);

    void updateGroupSetting(Long groupId, GroupUpdateSettingReqVO req);

    /**
     * Lay danh sach cac nhom chung cua 2 nguoi dung.
     * Chi lay danh sach cac nhom ma @currentUserId la nguoi kiem duyet/quan ly
     * va @userId la thanh vien
     * @param currentUserId
     * @param userId
     */
    List<GroupRespVO> suggestGroupToBanUser(Long currentUserId, Long userId);
}
