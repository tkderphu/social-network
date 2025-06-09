//package viosmash.service.v1;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import viosmash.collection.CollUtils;
//import viosmash.controller.v1.vo.CommentNotificationRespVO;
//import viosmash.controller.v1.vo.FriendNotificationRespVO;
//import viosmash.controller.v1.vo.NotificationRespVO;
//import viosmash.controller.v1.vo.PostNotificationRespVO;
//import viosmash.dal.dataobject.v1.*;
//import viosmash.dal.repo.v1.CommentNotificationRepository;
//import viosmash.dal.repo.v1.NotificationRepository;
//import viosmash.dal.repo.v1.VoteNotificationRepository;
//import viosmash.friendship.api.FriendshipApi;
//import viosmash.object.BeanUtil;
//import viosmash.post.api.PostApi;
//import viosmash.profile.api.UserApi;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class NotificationServiceImpl implements NotificationService{
//    private final NotificationRepository notificationRepository;
//    private final VoteNotificationRepository voteNotificationRepository;
//    private final CommentNotificationRepository commentNotificationRepository;
//    private final PostApi postApi;
//    private final UserApi userApi;
//    private final FriendshipApi friendshipApi;
//    @Override
//    public List<NotificationRespVO> getListNotification(Long userId, int page, int limit) {
//        Pageable pageable = PageRequest.of(page - 1, limit);
//        List<Notification> notifications = this.notificationRepository.findAllByToUserId(userId, pageable).getContent();
//        return convert(notifications);
//    }
//
//
//    @Override
//    public List<NotificationRespVO> getListNotification(Long userId, Boolean isRead, int page, int limit) {
//        Pageable pageable = PageRequest.of(page - 1, limit);
//        List<Notification> notifications = this.notificationRepository
//                .findAllByToUserIdAndIsRead(userId, isRead, pageable)
//                .getContent();
//        return convert(notifications);
//    }
//
//    @Override
//    public int countUnread(Long userId, Boolean isRead) {
//        return this.notificationRepository.countAllByToUserIdAndIsRead(userId, isRead);
//    }
//
//    @Override
//    public void updateRead(Long id) {
//        Notification notification = this.notificationRepository.findById(id).get();
//        notification.setIsRead(true);
//        this.notificationRepository.save(notification);
//    }
//
//    @Override
//    @Transactional
//    public void updateReadAll(Long userId) {
//        this.notificationRepository.updateReadAllByToUserId(userId);
//    }
//
//    @Override
//    public void saveNotification(Notification notification) {
//        if(notification instanceof PostNotification) {
//            //when new post coming => fromUserId will be owner of this post
//            //=> get list friends of this user
//            List<Long> friends = friendshipApi.getListFriends(notification.getFromUserId());
//            CollUtils.convertList(friends, userId -> {
//               notification.setToUserId(userId);
//               notification.setId(null);
//               this.notificationRepository.save(notification);
//               return null;
//            });
//        } else if (notification instanceof CommentNotification) {
//            CommentNotification c1 = (CommentNotification) notification;
//            CommentNotification commentNotification = null;
//            if(c1.getCommentId() != null) {
//                commentNotification = this.commentNotificationRepository.findByCommentId(c1.getCommentId())
//                        .orElse(null);
//
//            } else {
//                commentNotification = this.commentNotificationRepository.findByPostId(c1.getPostId())
//                        .orElse(null);
//
//            }
//            if(commentNotification != null) {
//                c1.setId(commentNotification.getId());
//                c1.setHistoryUsers(commentNotification.getHistoryUsers());
//            }
//            c1.addHistory(c1.getFromUserId());
//            this.notificationRepository.save(c1);
//        } else if (notification instanceof FriendNotification) {
//            this.notificationRepository.save(notification);
//        } else if (notification instanceof VoteNotification) {
//            VoteNotification c1 = (VoteNotification) notification;
//            VoteNotification voteNotification = voteNotificationRepository.findBy
//            if(commentNotification != null) {
//                c1.setId(commentNotification.getId());
//                c1.setHistoryUsers(commentNotification.getHistoryUsers());
//            }
//            c1.addHistory(c1.getFromUserId());
//            this.notificationRepository.save(c1);
//        }
//    }
//
//    @Override
//    public void deleteNotification(Notification notification) {
//
//    }
//
//    private List<NotificationRespVO> convert(List<Notification> objs) {
//        return CollUtils.convertList(objs, notification -> {
//            NotificationRespVO resp = null;
//            if(notification instanceof PostNotification) {
//                PostNotification postNotification = (PostNotification) notification;
//                PostNotificationRespVO postResp = BeanUtil.copy(postNotification, PostNotificationRespVO.class);
//                postResp.setPost(postApi.getPostById(postNotification.getPostId()));
//                resp = postResp;
//            } else if(notification instanceof CommentNotification) {
//                CommentNotification commentNotification = (CommentNotification) notification;
//                CommentNotificationRespVO commentResp = BeanUtil.copy(commentNotification, CommentNotificationRespVO.class);
////                commentResp.setPost(postApi.getPostById(commentNotification.getPostId()));
//                commentResp.setRepeated(commentNotification.getHistoryUsers().size() - 1);
//                resp = commentResp;
//            } else if(notification instanceof VoteNotification) {
//                PostNotification postNotification = (PostNotification) notification;
//                PostNotificationRespVO postResp = BeanUtil.copy(postNotification, PostNotificationRespVO.class);
//                postResp.setPost(postApi.getPostById(postNotification.getPostId()));
//                resp = postResp;
//            } else if(notification instanceof FriendNotification) {
//                FriendNotification friendNotification = (FriendNotification) notification;
//                FriendNotificationRespVO fResp = BeanUtil.copy(friendNotification, FriendNotificationRespVO.class);
//                fResp.setType(friendNotification.getFriendTypeAction().name());
//                resp = fResp;
//            }
////            resp.setFromUser(userApi.getUserById(notification.getFromUserId()));
//            return resp;
//        });
//    }
//
//}
