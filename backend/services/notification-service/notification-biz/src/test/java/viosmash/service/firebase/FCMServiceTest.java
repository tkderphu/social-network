package viosmash.service.firebase;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.BaseTest;
import viosmash.WebsocketConfig;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class FCMServiceTest extends BaseTest {

    @MockitoBean
    private SimpMessagingTemplate template;

    @Autowired
    private FCMService fcmService;

    @Test
    void getIdToken() {
        String idToken = fcmService.getIdToken(1l);

        Assertions.assertNotNull(idToken);
    }

    @Test
    void sendNotification() {
        Collection<Long> userIds = List.of(6l);
        Map<String, String> map = new HashMap<>();
        map.put("url", "https://google.com");
        fcmService.sendNotification("hello", "click here",map, userIds);
    }
}