package viosmash.converter;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.controller.profile.vo.UserProfileRespVO;
import viosmash.dal.dataobject.profile.UserAddress;
import viosmash.dal.dataobject.profile.UserEducation;
import viosmash.dal.dataobject.profile.UserProfile;
import viosmash.collection.CollUtils;
import viosmash.object.BeanUtil;

import java.util.List;

@Mapper
public interface ProfileConverter {
    ProfileConverter INSTANCE = Mappers.getMapper(ProfileConverter.class);

    default UserProfileRespVO convert(UserProfile userProfile,
                                      List<UserEducation> userEducation,
                                      List<UserAddress> userAddress) {
        UserProfileRespVO userProfileRespVO = BeanUtil.copy(userProfile, UserProfileRespVO.class);
        userProfileRespVO.setAddresses(CollUtils.convertList(userAddress, (address) -> {
            return BeanUtil.copy(address, UserProfileRespVO.AddressResp.class);
        }));
        userProfileRespVO.setEducations(CollUtils.convertList(userEducation, (education) -> {
            return BeanUtil.copy(education, UserProfileRespVO.EducationResp.class);
        }));

        return userProfileRespVO;
    }
}
