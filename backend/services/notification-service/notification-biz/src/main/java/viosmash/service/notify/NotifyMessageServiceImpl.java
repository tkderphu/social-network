package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.dal.dataobject.NotifyTemplate;
import viosmash.dal.repo.NotifyMessageRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotifyMessageServiceImpl implements NotifyMessageService{
    private final NotifyMessageRepository notifyMessageRepository;


    @Override
    public NotifyMessage createNotifyMessage(Long userId,
                                             NotifyTemplate template,
                                             Map<String, Object> templateParams) {
        NotifyMessage notifyMessage = new NotifyMessage().setCreatedAt(LocalDateTime.now())
                .setRead(false).setUserId(userId)
                .setNotifyTemplate(template).setTemplateParams(templateParams);
        return this.notifyMessageRepository.save(notifyMessage);
    }

    @Override
    public List<NotifyMessage> getListNotify(Long userId) {
        return this.notifyMessageRepository.findAllByUserId(userId, Sort.by("id").descending());
    }

    @Override
    public List<NotifyMessage> getListUnreadNotify(Long userId) {
        return this.notifyMessageRepository.findAllByUserIdAndRead(userId, false);
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
}
