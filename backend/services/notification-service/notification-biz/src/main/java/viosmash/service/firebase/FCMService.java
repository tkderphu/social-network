package viosmash.service.firebase;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static viosmash.exception.utils.ServiceUtils.exception;

@Slf4j
@Service
@RequiredArgsConstructor
public class FCMService {

    public String getIdToken(Long userId)  {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentSnapshot document = db.collection("token")
                    .document(String.format("user_%d", userId))
                    .get()
                    .get();

            if (document.exists()) {
                return document.getString("fcmToken");
            } else {
                log.warn("No token found for user_" + userId);
                return null;
            }
        } catch (Exception ex) {
            log.error("[notification-service][getIdToken({})]: {}", userId, ex);
            return null;
        }
    }

    @Async
    public void sendNotification(String title, String body, Map<String, String> properties, Collection<Long> userIds) {
        CollUtils.convertList(userIds, userId -> {
            String token = getIdToken(userId);
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .putAllData(properties)
                    .build();
            try {
                String response = FirebaseMessaging.getInstance().send(message);
                log.info("FCM Message Sent to user {}: {}", userId, response);
            } catch (Exception e) {
                log.error("FCM Message Sent to user {} has error: {}", userId, e);
            }
            return null;
        }) ;
    }
}
