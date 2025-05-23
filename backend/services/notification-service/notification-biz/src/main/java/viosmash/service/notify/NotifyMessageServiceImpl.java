package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.message.NotifyMessageRespVO;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.dal.repo.NotifyMessageRepository;
import viosmash.notification.enums.NotificationType;
import viosmash.object.BeanUtil;
import viosmash.profile.api.UserApi;
import viosmash.profile.api.UserDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotifyMessageServiceImpl implements NotifyMessageService{
    private final NotifyMessageRepository notifyMessageRepository;
    private final UserApi userApi;

    @Override
    public NotifyMessage createNotifyMessage(Long userId,
                                             NotificationType type, Map<String, Object> templateParams) {
        NotifyMessage notifyMessage = new NotifyMessage().setCreatedAt(LocalDateTime.now())
                .setType(type).setSeen(false).setUserId(userId).setTemplateParams(templateParams);
        return this.notifyMessageRepository.save(notifyMessage);
    }

    @Override
    public List<NotifyMessageRespVO> getListNotify(Long userId) {
        List<NotifyMessage> notifications = this.notifyMessageRepository.findAllByUserId(userId, Sort.by("id").descending());
        return CollUtils.convertList(notifications, notification -> {
           return BeanUtil.copy(notification, NotifyMessageRespVO.class)
                   .setParams(buildParams(notification))
                   .setRead(notification.getSeen() == null ? false : notification.getSeen());
        });
    }

    @Override
    public List<NotifyMessage> getListUnreadNotify(Long userId) {
        return this.notifyMessageRepository.findAllByUserIdAndSeen(userId, false);
    }

    @Override
    public int countUnreadNotify(Long userId) {
        return this.notifyMessageRepository.countUnreadNotifyByUserId(userId);
    }

    @Override
    public void readAllNotifyMessage(Long userId) {
        this.notifyMessageRepository.updateReadByUserId(true, userId);
    }

    @Override
    public void readNotifyMessage(Long notifyMessageId) {
        this.notifyMessageRepository.updateReadById(true, notifyMessageId);
    }


    private NotifyMessageRespVO.Params buildParams(NotifyMessage message) {
        Map<String, Object> templates = message.getTemplateParams();
        NotifyMessageRespVO.Params params = new NotifyMessageRespVO.Params();
        if(templates.containsKey("fromUserId")) {
            UserDTO userDTO = userApi.getUserById(Long.parseLong(templates.get("fromUserId") + ""));
            params.setUserAvatar(userDTO.getAvatar()).setUserId(userDTO.getId())
                    .setUserFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        }

        return params;
    }
}
