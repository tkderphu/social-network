package viosmash.service.notify;

import org.springframework.scheduling.annotation.Async;

import java.util.Map;

public interface SendNotifyService {
    void sendNotifyMessage(Long userId, String templateId, Map<String, Object> templateParams);
    @Async
    void notifySingleMessage(Long userId, String templateName, Map<String, Object> templateParams);

}
