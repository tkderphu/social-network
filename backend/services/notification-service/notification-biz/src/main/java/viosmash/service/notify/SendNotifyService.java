package viosmash.service.notify;

public interface SendNotifyService {
    void sendNotifyMessage(Long userId, String title, String body);
}
