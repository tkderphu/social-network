package viosmash.service.profile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import viosmash.EventConstant;
import viosmash.controller.profile.vo.UserProfileRespVO;
import viosmash.controller.profile.vo.UserProfileUpdateReqVO;
import viosmash.converter.ProfileConverter;
import viosmash.dal.dataobject.privacy.*;
import viosmash.dal.dataobject.profile.*;
import viosmash.dal.repository.privacy.UserMessageRepository;
import viosmash.dal.repository.privacy.UserNotificationRepository;
import viosmash.dal.repository.privacy.UserPostRepository;
import viosmash.dal.repository.profile.UserAddressRepository;
import viosmash.dal.repository.profile.UserEducationRepository;
import viosmash.dal.repository.profile.UserPersonalImageRepository;
import viosmash.dal.repository.profile.UserProfileRepository;
import viosmash.event.auth.UserCreated;
import viosmash.pojo.KeyValue;
import viosmash.json.JsonUtils;
import viosmash.object.ObjectUtils;
import viosmash.string.StringUtils;

import java.util.Date;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService{

    /**
     * privacy
     */
    private final UserMessageRepository userMessageRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final UserPostRepository userPostRepository;

    private final UserAddressRepository userAddressRepository;
    private final UserEducationRepository userEducationRepository;
    private final UserPersonalImageRepository userPersonalImageRepository;
    private final UserProfileRepository userProfileRepository;


    @RabbitListener(queues = EventConstant.USER_CREATED + EventConstant.QUEUE_SUFFIX)
    @Override
    public void saveProfile(String jsonUserCreatedEvent) {
        log.info("[saveProfile] receive event[createdUserEvent]({})", jsonUserCreatedEvent);
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
        UserProfile userProfile = getById(userId);
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
        if(userProfileUpdateReqVO.getAddress() != null) {
            KeyValue<AddressEnum, KeyValue<Long, String>> address = userProfileUpdateReqVO.getAddress();
            UserAddress userAddress = userAddressRepository
                    .findByUserIdAndAddressEnum(userId, address.getKey())
                    .orElse(null);
            if(userAddress == null) {
                userAddress = new UserAddress().setAddressEnum(address.getKey())
                        .setUserId(userId).setPageId(address.getValue().getKey())
                        .setPageName(address.getValue().getValue());
            } else {
                userAddress.setPageId(address.getValue().getKey())
                        .setPageName(address.getValue().getValue());
            }
            this.userAddressRepository.save(userAddress);
        }
        if(userProfileUpdateReqVO.getEducation() != null) {
            KeyValue<EducationEnum, KeyValue<Long, String>> education = userProfileUpdateReqVO.getEducation();
            UserEducation userEducation = userEducationRepository
                    .findByUserIdAndEducationEnum(userId, education.getKey())
                    .orElse(null);
            if(userEducation == null) {
                userEducation = new UserEducation().setEducationEnum(education.getKey())
                        .setUserId(userId).setPageId(education.getValue().getKey())
                        .setPageName(education.getValue().getValue());
            } else {
                userEducation.setPageId(education.getValue().getKey())
                        .setPageName(education.getValue().getValue());
            }
            this.userEducationRepository.save(userEducation);
        }
        this.userProfileRepository.save(userProfile);
    }


    @Override
    public UserProfileRespVO getProfileById(Long userId) {
        UserProfile userProfile = getById(userId);
        List<UserAddress> addresses = userAddressRepository.findAllByUserId(userId);
        List<UserEducation> educations = userEducationRepository.findAllByUserId(userId);
        return ProfileConverter.INSTANCE.convert(userProfile, educations, addresses);
    }

    private UserProfile getById(Long userId) {
        return this.userProfileRepository.findById(userId)
                .orElseThrow(() -> exception(404, "Not found user"));
    }

}
