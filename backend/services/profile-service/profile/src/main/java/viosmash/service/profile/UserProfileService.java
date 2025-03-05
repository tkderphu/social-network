package viosmash.service.profile;

import viosmash.controller.profile.vo.UserProfileUpdateReqVO;
import viosmash.dal.dataobject.profile.UserProfile;

public interface UserProfileService {
    void saveProfile(String jsonUserCreatedEvent);
    void updateProfile(Long userId, UserProfileUpdateReqVO userProfileUpdateReqVO);

    UserProfile getProfileById(Long userId);
}
