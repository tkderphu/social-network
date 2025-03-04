package viosmash.service.profile;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import viosmash.controller.profile.vo.UserProfileUpdateReqVO;
import viosmash.dal.dataobject.privacy.*;
import viosmash.dal.dataobject.profile.SexEnum;
import viosmash.dal.dataobject.profile.UserProfile;
import viosmash.dal.repository.privacy.UserMessageRepository;
import viosmash.dal.repository.privacy.UserNotificationRepository;
import viosmash.dal.repository.privacy.UserPostRepository;
import viosmash.dal.repository.profile.UserAddressRepository;
import viosmash.dal.repository.profile.UserEducationRepository;
import viosmash.dal.repository.profile.UserPersonalImageRepository;
import viosmash.dal.repository.profile.UserProfileRepository;
import viosmash.event.auth.UserCreated;
import viosmash.utils.json.JsonUtils;
import viosmash.utils.object.ObjectUtils;
import viosmash.utils.string.StringUtils;

import java.util.Date;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService{

    /**
     * privacy
     */
    private UserMessageRepository userMessageRepository;
    private UserNotificationRepository userNotificationRepository;
    private UserPostRepository userPostRepository;

    private UserAddressRepository userAddressRepository;
    private UserEducationRepository userEducationRepository;
    private UserPersonalImageRepository userPersonalImageRepository;
    private UserProfileRepository userProfileRepository;

    @RabbitListener
    @Override
    public void saveProfile(String jsonUserCreatedEvent) {
        UserCreated event = JsonUtils.toObject(jsonUserCreatedEvent, UserCreated.class);
        UserProfile userProfile = new UserProfile().setUserId(event.getUserId())
                .setCreatedDate(new Date()).setDateOfBirth(event.getDob())
                .setSexEnum(SexEnum.of(event.getSex()))
                .setFirstName(event.getFirstName()).setLastName(event.getLastName());

        UserMessage userMessage = new UserMessage().setMessageEnum(MessageEnum.ANYONE)
                .setUserId(event.getUserId());

        UserPost userPost = new UserPost().setPostEnum(PostEnum.PUBLIC)
                .setUserId(event.getUserId());

        UserNotification userNotification = new UserNotification()
                .setUserId(event.getUserId()).setNotificationEnum(NotificationEnum.FRIENDS);

        this.userProfileRepository.save(userProfile);
        this.userMessageRepository.save(userMessage);
        this.userPostRepository.save(userPost);
        this.userNotificationRepository.save(userNotification);

    }

    @Override
    public void updateProfile(Long userId, UserProfileUpdateReqVO userProfileUpdateReqVO) {
        UserProfile userProfile = getProfileById(userId);
        if(StringUtils.isEmpty(userProfileUpdateReqVO.getFirstName())) {
            userProfile.setFirstName(userProfileUpdateReqVO.getFirstName());
        }
        if(StringUtils.isEmpty(userProfileUpdateReqVO.getLastName())) {
            userProfile.setFirstName(userProfileUpdateReqVO.getLastName());
        }
        if(StringUtils.isEmpty(userProfileUpdateReqVO.getPhoneNumber())) {
            userProfile.setFirstName(userProfileUpdateReqVO.getPhoneNumber());
        }
        if(!ObjectUtils.isNull(userProfileUpdateReqVO.getDateOfBirth())) {
            userProfile.setDateOfBirth(userProfileUpdateReqVO.getDateOfBirth());
        }
        if(!ObjectUtils.isNull(userProfileUpdateReqVO.getSexEnum())) {
            userProfile.setSexEnum(userProfileUpdateReqVO.getSexEnum());
        }


        this.userProfileRepository.save(userProfile);
    }


    @Override
    @RabbitListener
    public void uploadPersonalImage() {

    }

    @Override
    public UserProfile getProfileById(Long userId) {
        return this.userProfileRepository.findById(userId)
                .orElseThrow(() -> exception(404, "Not found user"));
    }

}
