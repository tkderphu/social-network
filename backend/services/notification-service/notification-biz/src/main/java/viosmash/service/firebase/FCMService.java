package viosmash.service.firebase;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;
@Service
public class FCMService {

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
