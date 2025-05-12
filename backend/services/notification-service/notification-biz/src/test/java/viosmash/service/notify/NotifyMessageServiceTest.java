package viosmash.service.notify;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.post.vo.template.NotifyTemplateCreatedReqVO;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.notification.enums.NotificationType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

class NotifyMessageServiceTest extends BaseTest {
    @Autowired
    private SendNotifyService sendNotifyService;
    @Autowired
    private NotifyTemplateService notifyTemplateService;
    @Autowired
    private NotifyMessageService notifyMessageService;

    void createNotifyMessage(NotificationType type) {
        NotifyTemplateCreatedReqVO req = new NotifyTemplateCreatedReqVO();
        req.setName("Notify to user when received follower");
        req.setId(type.name());
        String input = "<li class='list-group-item notify-background d-flex align-items-start {{read}}'>\n" +
                "    <img\n" +
                "        src='{{userAvatar}}'\n" +
                "        alt='avatar'\n" +
                "        class='rounded-circle me-3'\n" +
                "        width='40'\n" +
                "        height='40'\n" +
                "    />\n" +
                "    <div class='flex-grow-1'>\n" +
                "        <div class='mb-1'>\n" +
                "            <strong>{{userFullName}}</strong> đã theo doi ban\n" +
                "        </div>\n" +
                "        <small class='text-muted'>{{time}}</small>\n" +
                "    </div>\n" +
                "</li>\n";
        req.setContent(input);
        notifyTemplateService.createNotifyTemplate(req);
        Map<String, Object> templateParams = new HashMap<>();
        templateParams.put("read", "");
        templateParams.put("userAvatar", "hehe");
        templateParams.put("userFullName", "dasdasd");
        templateParams.put("time", "2h");

        sendNotifyService.sendNotifyMessage(1l, type.name(), templateParams);

    }


    @Test
    void getListNotify() {
        createNotifyMessage(NotificationType.FOLLOW_USER);
        createNotifyMessage(NotificationType.CREATED_REACTION);
        createNotifyMessage(NotificationType.CREATED_REPLY_COMMENT);

        List<NotifyMessage> listNotify = this.notifyMessageService.getListNotify(1l);
        Assertions.assertEquals(listNotify.size(), 3);
    }

    @Test
    void getListUnreadNotify() {
        createNotifyMessage(NotificationType.FOLLOW_USER);
        createNotifyMessage(NotificationType.CREATED_REACTION);
        createNotifyMessage(NotificationType.CREATED_REPLY_COMMENT);
        List<NotifyMessage> listNotify = this.notifyMessageService.getListUnreadNotify(1l);
        Assertions.assertEquals(listNotify.size(), 3);

    }

    @Test
    void countUnreadNotify() {
        createNotifyMessage(NotificationType.FOLLOW_USER);
        createNotifyMessage(NotificationType.CREATED_REACTION);
        createNotifyMessage(NotificationType.CREATED_REPLY_COMMENT);
        notifyMessageService.readNotifyMessage(3l);
        notifyMessageService.readNotifyMessage(1l);
        List<NotifyMessage> listNotify = this.notifyMessageService.getListUnreadNotify(1l);
        Assertions.assertEquals(listNotify.size(), 1);
    }

    @Test
    void readAllNotifyMessage() {
        createNotifyMessage(NotificationType.FOLLOW_USER);
        createNotifyMessage(NotificationType.CREATED_REACTION);
        createNotifyMessage(NotificationType.CREATED_REPLY_COMMENT);
        notifyMessageService.readAllNotifyMessage(1l);
        List<NotifyMessage> listNotify = this.notifyMessageService.getListUnreadNotify(1l);
        Assertions.assertEquals(listNotify.size(), 0);
    }
}