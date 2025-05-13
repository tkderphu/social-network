package viosmash.service.notify;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.BaseTest;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.notification.enums.NotificationType;
import viosmash.service.mail.MailService;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import static viosmash.notification.enums.NotificationType.FORGOT_PASSWORD;

class SendNotifyServiceTest extends BaseTest {

    @Autowired
    private MailService mailService;
    @Autowired
    private SendNotifyService sendNotifyService;
    @MockitoBean
    private NotificationApi notificationApi;
    @Test
    void testMail() {
        mailService.sendMail("quangphu2050@gmail.com", "hello world", "vl");
        System.out.println("vcl");
    }

    @Test
    void sendNotifyMessage() {
    }

    @Test
    void notifySingleMessage() {
    }

    @Test
    void mailNotifySingleMessage() {
        Mockito.doAnswer(invocation -> {
            NotificationDto dto = invocation.getArgument(0); // get the method argument
            sendNotifyService.mailNotifySingleMessage(
                    dto.getProperties(),
                    dto.getType(),
                    "Forgot password"
            );

            // Your custom logic here
            // e.g., simulate side effects or assert intermediate state

            return null; // because the method returns void
        }).when(notificationApi).sendNotification(Mockito.any(NotificationDto.class));
        Map<String, Object> map = new HashMap<>();
        map.put("email", "quangphu2050@gmail.com");
        map.put("fullName", "Phu Quang");
        map.put("forgotCode", "23532or523tfwekfjwelft");
        map.put("joined", "2025-05-12 11:23:33");
        map.put("expires", 5);
        NotificationDto dto = new NotificationDto();
        dto.setProperties(map);
        dto.setType(FORGOT_PASSWORD);
        notificationApi.sendNotification(dto);

        System.out.println("----------------------send success---------------------");
        new Scanner(System.in).nextLine();
    }
}