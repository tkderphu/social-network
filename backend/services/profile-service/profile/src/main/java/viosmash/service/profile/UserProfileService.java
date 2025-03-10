package viosmash.service.profile;

import viosmash.controller.profile.vo.UserProfileRespVO;
import viosmash.controller.profile.vo.UserProfileUpdateReqVO;

public interface UserProfileService {
    void saveProfile(String jsonUserCreatedEvent);
    void updateProfile(Long userId, UserProfileUpdateReqVO userProfileUpdateReqVO);

    UserProfileRespVO getProfileById(Long userId);
}
