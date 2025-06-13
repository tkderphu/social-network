package viosmash.service.notify.v1;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;
import viosmash.BaseTest;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.NotificationMessageRespVO;
import viosmash.dal.dataobject.NotificationMessage;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.dal.repo.NotificationMessageRepository;
import viosmash.dal.repo.NotificationSettingRepository;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;
import viosmash.post.api.PostApi;
import viosmash.profile.api.UserApi;
import viosmash.random.RandomUtils;

import java.sql.Timestamp;
import java.util.List;

import static viosmash.notification.enums.NotificationType.NEW_COMMENT;
import static viosmash.notification.enums.TargetType.COMMENT;
import static viosmash.notification.enums.TargetType.POST;

@Slf4j
public class NotificationMessageRepoTest extends BaseTest {


    @Autowired
    private NotificationMessageRepository notificationMessageRepository;

    @Autowired
    private NotificationSettingRepository notificationSettingRepository;

    @MockitoBean
    private UserApi userApi;

    @MockitoBean
    private PostApi postApi;

    @Test
    @Transactional
    public void getListMessage() {
        Long userId = 1l;
        List<NotificationMessage> notificationMessages = RandomUtils.randomList(NotificationMessage.class, m -> {
            m.setId(null);
            m.setUserId(userId);
            m.setSeen(false);
        });


        //user2 comment to user: 1 =>

        notificationMessages.get(0).setNotificationType(NEW_COMMENT)
                .setTargetId(5l).setTargetType(COMMENT);

        notificationMessages.get(1).setNotificationType(NEW_COMMENT)
                .setTargetId(5l).setTargetType(COMMENT);

        notificationMessages.get(2).setNotificationType(NEW_COMMENT)
                .setTargetId(5l).setTargetType(COMMENT);

        notificationMessages.get(3).setNotificationType(NEW_COMMENT)
                .setTargetId(5l).setTargetType(COMMENT);

        notificationMessages.get(4).setNotificationType(NEW_COMMENT)
                .setTargetId(5l).setTargetType(COMMENT);

        notificationMessages.get(5).setNotificationType(NEW_COMMENT)
                .setTargetId(5l).setTargetType(POST);

        this.notificationMessageRepository.saveAll(notificationMessages);

        List<Object[]> allByUserId = this.notificationMessageRepository.findAllByUserId(userId, 10, 0);
        List<NotificationMessageRespVO> resp = CollUtils.convertList(allByUserId, objs -> {
            return convert(objs);
        });


        log.info("data: ", resp);


        int unread = this.notificationMessageRepository.countUnread(userId);

        Assertions.assertEquals(unread, 2);



        this.notificationMessageRepository.updateSeenNotification(
                resp.get(0).getId()
        );

         unread = this.notificationMessageRepository.countUnread(userId);

        Assertions.assertEquals(unread, 1);


        List<Object[]> allByUserIdAndSeen = this.notificationMessageRepository.findAllByUserIdAndSeen(userId, false, 10, 0);

        Assertions.assertEquals(allByUserIdAndSeen.size(), 1);


        this.notificationMessageRepository.updateAllSeenNotification(
                CollUtils.convertList(resp, r -> r.getId())
        );


        unread = this.notificationMessageRepository.countUnread(userId);

        Assertions.assertEquals(unread, 0);

    }


    @Test
    public void testSetting() {
        Long userId = 1l;
        NotificationSetting notificationSetting = notificationSettingRepository
                .findById(userId)
                .orElse(null);
        if(notificationSetting == null) {
            notificationSetting = new NotificationSetting(userId);
            this.notificationSettingRepository.save(notificationSetting);
        }

        log.info("setting: ", notificationSetting);

        notificationSetting = notificationSettingRepository
                .findById(userId)
                .orElse(null);

        System.out.println("after terst");
    }

    public NotificationMessageRespVO convert(Object[] obj) {
        NotificationMessageRespVO res = new NotificationMessageRespVO();
        res.setId((Long) obj[0]).setTargetType(TargetType.valueOf((String) obj[1]))
                .setTarget(null).setNotificationType(NotificationType.valueOf((String) obj[3]))
                .setCreatedAt(((Timestamp) obj[4]).toLocalDateTime())
                .setActor(null).setSeen((Boolean) obj[7])
                .setOthers((Long) obj[8]);
        return res;

    }

}
