package viosmash.service;


import viosmash.constant.AddressEnum;
import viosmash.constant.PolicyEnum;
import viosmash.constant.SchoolEnum;
import viosmash.controller.vo.UserCreateReqVO;
import viosmash.controller.vo.UserRespVO;
import viosmash.controller.vo.UserUpdateInfoReqVO;
import viosmash.dal.dataobject.User;

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
}
