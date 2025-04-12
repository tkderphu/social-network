package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.dal.repo.NotifyMessageRepository;
import viosmash.pojo.PageResult;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotifyMessageServiceImpl implements NotifyMessageService{
    private final NotifyMessageRepository notifyMessageRepository;
    @Override
    public NotifyMessage createNotifyMessage(Long userId, String title, String body) {
        return null;
    }

    @Override
    public PageResult<NotifyMessage> getListNotify(Long userId, int page, int limit) {
        PageRequest req = PageRequest.of(page - 1, limit);
        Page<NotifyMessage> pageResult = notifyMessageRepository.findAllByUserId(userId, req);
        return new PageResult<>(page, limit, pageResult.getContent(), pageResult.getTotalPages());
    }

    @Override
    public int countUnreadNotify(Long userId) {
        return 0;
    }

    @Override
    public void readAllNotifyMessage(Long userId) {

    }

    @Override
    public NotifyMessage readNotifyMessage(String notifyMessageId) {
        return null;
    }
}
