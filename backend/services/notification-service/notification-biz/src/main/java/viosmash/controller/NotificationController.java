//package viosmash.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//import viosmash.controller.vo.message.NotifyMessageRespVO;
//import viosmash.core.utils.SecurityUtils;
//import viosmash.dal.dataobject.NotifyMessage;
//import viosmash.pojo.CommonResult;
//import viosmash.pojo.PageResult;
//import viosmash.service.firebase.FCMService;
//import viosmash.service.notify.NotifyMessageService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/notifications")
//@RequiredArgsConstructor
//public class NotificationController {
//    private final FCMService fcmService;
//    private final NotifyMessageService notifyMessageService;
//    @GetMapping("/messages/user")
//    public CommonResult<List<NotifyMessageRespVO>> getListNotifyMessage() {
//        return null;
//    }
//
//    @PutMapping("/firebase/message/token/{token}")
//    public void storeFirebaseMessageToken(@PathVariable("token") String token) {
//        fcmService.storeFirebaseMessageToken(SecurityUtils.getLoginUserMemberId(), token);
//    }
//
//    @PutMapping("/messages/read/{notifyId}")
//    public CommonResult<Boolean> readNotifyMessage(@PathVariable("notifyId") Long notifyId) {
//        notifyMessageService.readNotifyMessage(notifyId);
//        return CommonResult.success(true);
//    }
//    @GetMapping("/messages/count/unread/user")
//    public CommonResult<Integer> countUnreadNotifyMessage() {
//        return CommonResult.success(notifyMessageService.countUnreadNotify(SecurityUtils.getLoginUserMemberId()));
//    }
//
//    @PutMapping("/messages/read-all")
//    public CommonResult<Boolean> readAllNotifyMessage() {
//        notifyMessageService.readAllNotifyMessage(SecurityUtils.getLoginUserMemberId());
//        return CommonResult.success(true);
//    }
//
//
//}
