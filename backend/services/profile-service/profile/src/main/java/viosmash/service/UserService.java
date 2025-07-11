package viosmash.service;


import viosmash.controller.vo.BlockedUserStatusResp;
import viosmash.core.utils.LoginUser;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.SchoolEnum;
import viosmash.controller.vo.UserCreateReqVO;
import viosmash.controller.vo.UserRespVO;
import viosmash.controller.vo.UserUpdateInfoReqVO;
import viosmash.dal.dataobject.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    void createUser(UserCreateReqVO req);
    void updateInfo(Long userId, UserUpdateInfoReqVO req);
    void updatePolicy(Long userId, Map<PolicyEnum, String> req);
    void updateAddress(Long userId, Map<AddressEnum, String> req);
    void updateSchool(Long userId, Map<SchoolEnum, String> req);
    void updateAvatar(Long userId, String avatar);
    void updateUserStatus(Long userId, Boolean isOnline);
    UserRespVO getProfile(Long userId);
    User getUserById(Long userId);
    User checkUser(String email, String password);

    String forgotPassword(String email);

    void updateNewPassword(String email, String newPassword);

    void changePassword(Long userId, String oldPassword, String oldPassword1);

    List<UserRespVO> searchUser(String name);

    void updateBlockUser(Long fromUserId, Long toUserId, Boolean typeBlock);
    List<UserRespVO> getListBlockedUser(Long fromUserId);

    BlockedUserStatusResp checkBlocked(Long currentUserId, Long userId);
}
