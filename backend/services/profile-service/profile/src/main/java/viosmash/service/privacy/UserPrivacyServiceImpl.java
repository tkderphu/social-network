package viosmash.service.privacy;

import org.springframework.stereotype.Service;
import viosmash.controller.privacy.vo.PrivacyRespVO;
import viosmash.converter.PrivacyConverter;
import viosmash.dal.dataobject.privacy.*;
import viosmash.dal.repository.privacy.UserMessageRepository;
import viosmash.dal.repository.privacy.UserNotificationRepository;
import viosmash.dal.repository.privacy.UserPostRepository;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
public class UserPrivacyServiceImpl implements UserPrivacyService{

    private final UserMessageRepository userMessageRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final UserPostRepository userPostRepository;

    public UserPrivacyServiceImpl(UserMessageRepository userMessageRepository, UserNotificationRepository userNotificationRepository, UserPostRepository userPostRepository) {
        this.userMessageRepository = userMessageRepository;
        this.userNotificationRepository = userNotificationRepository;
        this.userPostRepository = userPostRepository;
    }

    @Override
    public void updateMessagePrivacy(Long userId, MessageEnum messageEnum) {
        UserMessage userMessage = getUserMessage(userId);
        userMessage.setMessageEnum(messageEnum);
        this.userMessageRepository.save(userMessage);
    }

    @Override
    public void updatePostPrivacy(Long userId, PostEnum postEnum) {
        UserPost userPost = getUserPost(userId);
        userPost.setPostEnum(postEnum);
        this.userPostRepository.save(userPost);
    }

    @Override
    public void updateNotificationPrivacy(Long userId, NotificationEnum notificationEnum) {
        UserNotification userNotification = getUserNotification(userId);
        userNotification.setNotificationEnum(notificationEnum);
        this.userNotificationRepository.save(userNotification);
    }

    @Override
    public UserMessage getUserMessage(Long userId) {
        return this.userMessageRepository.findByUserId(userId).orElseThrow(() -> exception(404, "not found by user id"));
    }

    @Override
    public UserPost getUserPost(Long userId) {
        return this.userPostRepository.findByUserId(userId).orElseThrow(() -> exception(404, "not found by user id"));
    }

    @Override
    public UserNotification getUserNotification(Long userId) {
        return this.userNotificationRepository.findByUserId(userId).orElseThrow(() -> exception(404, "not found by user id"));
    }

    @Override
    public PrivacyRespVO getPrivacy(Long userId) {
        UserMessage userMessage = getUserMessage(userId);
        UserNotification userNotification = getUserNotification(userId);
        UserPost userPost = getUserPost(userId);

        return PrivacyConverter.INSTANCE.convert(userPost, userMessage, userNotification);
    }
}
