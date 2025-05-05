package viosmash.service.notify;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.post.vo.template.NotifyTemplateCreatedReqVO;
import viosmash.dal.dataobject.NotifyTemplate;
import viosmash.enums.NotificationType;

class NotifyTemplateServiceTest extends BaseTest {
    @Autowired
    private NotifyTemplateService notifyTemplateService;


    @Test
    void createNotifyTemplate() {
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
                "            <strong>{{userFullName}}</strong> đã phản hồi về bình luận của bạn trong bài viết\n" +
                "            <span class='text-primary ms-1'>{{postTitle}}</span>.\n" +
                "        </div>\n" +
                "        <small class='text-muted'>{{time}}</small>\n" +
                "    </div>\n" +
                "</li>\n";
        NotifyTemplateCreatedReqVO rew = new NotifyTemplateCreatedReqVO();
        rew.setId(NotificationType.CREATED_REPLY_COMMENT.name());
        rew.setName("Phan hoi binh luan");
        rew.setContent(input);
        NotifyTemplate notifyTemplate = notifyTemplateService.createNotifyTemplate(rew);
        System.out.println(notifyTemplate.getParams());
        System.out.println(notifyTemplate.getId());
        Assertions.assertEquals(notifyTemplate.getParams().size(), 5);
    }

    @Test
    void getNotifyTemplateById() {
        createNotifyTemplate();
        NotifyTemplate notifyTemplate = notifyTemplateService.getNotifyTemplateById(NotificationType.CREATED_REPLY_COMMENT.name());
        Assertions.assertNotNull(notifyTemplate);
    }

}