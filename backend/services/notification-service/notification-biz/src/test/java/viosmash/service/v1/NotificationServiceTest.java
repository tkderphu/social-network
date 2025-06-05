package viosmash.service.v1;

import com.netflix.discovery.converters.Auto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import viosmash.BaseTest;
import viosmash.controller.v1.vo.NotificationRespVO;
import viosmash.dal.dataobject.v1.CommentNotification;
import viosmash.dal.dataobject.v1.Notification;
import viosmash.dal.dataobject.v1.PostNotification;
import viosmash.dal.repo.v1.NotificationRepository;
import viosmash.object.BeanUtil;
import viosmash.random.RandomUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
class NotificationServiceTest extends BaseTest {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private NotificationService notificationService;
    @Test
    void getListNotification() {

    }

    @Test
    void testGetListNotification() {
        List<Long> list = List.of(1l, 2l, 3l, 5l, 7l,8l, 9l);
        Long toUserId = 10l;
        for(int i = 0; i < list.size(); i++) {
            int finalI = i;
            CommentNotification commentNotification = RandomUtils.randomObject(CommentNotification.class, p -> {
                p.setId(null);
                p.setFromUserId(list.get(finalI));
                p.setToUserId(toUserId);
                p.setPostId(1l);
                //not reply
                p.setCommentId(null);
            });

            this.notificationService.saveNotification(commentNotification);
        }
        List<NotificationRespVO> listNotification = notificationService.getListNotification(toUserId, 1, 20);
        //result will be 1 => i only get newest notification and i will count how many time comment to post is notified
        //in above example data i have only 1 post, and that post will be notified 10 times to user with id 10
        //when new comment coming

        //when fetch notify for user with id 10 => they only receive 1 notification and count(many time in the past that post is commented)
        Assertions.assertEquals(listNotification.size(), 1);
        Assertions.assertEquals(listNotification.get(0).getRepeated(), list.size() - 1);

    }

    @Test
    void countUnread() {
        List<Long> list = List.of(1l, 2l, 3l, 5l, 7l,8l, 9l);
        Long toUserId = 10l;
        for(int i = 0; i < list.size(); i++) {
            int finalI = i;
            PostNotification postNotification = RandomUtils.randomObject(PostNotification.class, p -> {
                p.setId(null);
                p.setIsRead(false);
                p.setFromUserId(list.get(finalI));
                p.setToUserId(toUserId);
            });

            this.notificationRepository.save(postNotification);
        }
        int i = this.notificationService.countUnread(toUserId, false);
        Assertions.assertEquals(i, list.size());
    }

    @Test
    void updateRead() {
    }

    @Test
    void updateReadAll() {
    }

    @Test
    void saveNotification() {
        List<Long> list = List.of(1l, 2l, 3l, 5l, 7l,8l, 9l);
        Long toUserId = 10l;
        for(int i = 0; i < list.size(); i++) {
            int finalI = i;
            PostNotification postNotification = RandomUtils.randomObject(PostNotification.class, p -> {
                p.setId(null);
                p.setFromUserId(list.get(finalI));
                p.setToUserId(toUserId);
            });

            CommentNotification commentNotification = RandomUtils.randomObject(CommentNotification.class, p -> {
                p.setId(null);
                p.setFromUserId(list.get(finalI));
                p.setToUserId(toUserId);
                p.setCommentId(list.get(finalI));
            });
            this.notificationRepository.save(postNotification);
            this.notificationRepository.save(commentNotification);
        }

    }



    @Test
    void check() {

        CommentNotification notification1 = new CommentNotification();
        notification1.setPostId(1l);
        notification1.setToUserId(1l);
        notification1.setFromUserId(2l);

        CommentNotification notification2 = new CommentNotification();
        notification2.setPostId(1l);
        notification2.setToUserId(1l);
        notification2.setFromUserId(5l);

        CommentNotification notification3 = new CommentNotification();
        notification3.setPostId(1l);
        notification3.setToUserId(1l);
        notification3.setFromUserId(3l);

        CommentNotification notification4 = new CommentNotification();
        notification4.setPostId(1l);
        notification4.setToUserId(1l);
        notification4.setFromUserId(2l);


        //user1 receive notification is @notification4 and count  = 2

        notificationService.saveNotification(notification1);
        notificationService.saveNotification(notification2);
        notificationService.saveNotification(notification3);
        notificationService.saveNotification(notification4);

        CommentNotification notification5 = new CommentNotification();
        notification5.setPostId(1l);
        notification5.setToUserId(1l);
        notification5.setFromUserId(2l);
        notification5.setCommentId(1l);

        CommentNotification notification6 = new CommentNotification();
        notification6.setPostId(1l);
        notification6.setToUserId(1l);
        notification6.setFromUserId(10l);
        notification6.setCommentId(1l);

        CommentNotification notification7 = new CommentNotification();
        notification7.setPostId(1l);
        notification7.setToUserId(1l);
        notification7.setFromUserId(2l);
        notification7.setCommentId(1l);

        notificationService.saveNotification(notification5);
        notificationService.saveNotification(notification6);
        notificationService.saveNotification(notification7);

        List<NotificationRespVO> listNotification = notificationService.getListNotification(1l, 1, 10);
        log.info("info: {}", listNotification);
        Assertions.assertEquals(listNotification.size(), 2);

    }

}