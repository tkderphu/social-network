package viosmash.service.firebase;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FCMService {

    private final FirebaseMessageTokenRepository firebaseMessageTokenRepository;

    public void storeFirebaseMessageToken(Long userId, String token) {
        firebaseMessageTokenRepository.save(new FirebaseMessageToken()
                .setToken(token)
                .setUserId(userId));
    }

    public void sendNotification(String title, String body, String token) {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("FCM Message Sent: " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
