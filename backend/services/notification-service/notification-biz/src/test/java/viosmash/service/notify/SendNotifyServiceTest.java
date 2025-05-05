package viosmash.service.notify;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.post.vo.template.NotifyTemplateCreatedReqVO;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.enums.NotificationType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

class SendNotifyServiceTest extends BaseTest {
    @Autowired
    private SendNotifyService sendNotifyService;
    @Autowired
    private NotifyTemplateService notifyTemplateService;
    @Autowired
    private NotifyMessageService notifyMessageService;
    @Test
    void sendNotifyMessage() {
        NotifyTemplateCreatedReqVO req = new NotifyTemplateCreatedReqVO();
        req.setName("Notify to user when received follower");
        req.setId(NotificationType.FOLLOW_USER.name());
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

        sendNotifyService.sendNotifyMessage(1l, NotificationType.FOLLOW_USER.name(), templateParams);

        List<NotifyMessage> listNotify = notifyMessageService.getListNotify(1l);
        System.out.println(listNotify.get(0).getContent());
        Assertions.assertEquals(listNotify.size(), 1l);

    }
}