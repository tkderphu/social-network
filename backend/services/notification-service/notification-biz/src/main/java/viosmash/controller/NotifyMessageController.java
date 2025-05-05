package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.collection.CollUtils;
import viosmash.controller.post.vo.message.NotifyMessageRespVO;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.pojo.CommonResult;
import viosmash.service.notify.NotifyMessageService;

import java.util.List;

import static viosmash.convert.NotificationConvert.INSTANCE;
import static viosmash.core.utils.SecurityUtils.getLoginUserMemberId;

@RestController
@RequestMapping("/api/notifications/messages")
@RequiredArgsConstructor
public class NotifyMessageController {
    private final NotifyMessageService notifyMessageService;
    @GetMapping("/user")
    public CommonResult<List<NotifyMessageRespVO>> getListNotifyMessage() {
        List<NotifyMessage> notifyMessages = notifyMessageService.getListNotify(getLoginUserMemberId());
        return CommonResult.success(CollUtils.convertList(notifyMessages, INSTANCE::convert));
    }

    @GetMapping("/user/unread")
    public CommonResult<List<NotifyMessageRespVO>> getListUnreadNotifyMessage() {
        List<NotifyMessage> notifyMessages = notifyMessageService.getListUnreadNotify(getLoginUserMemberId());
        return CommonResult.success(CollUtils.convertList(notifyMessages, INSTANCE::convert));
    }

    @PutMapping("/read/{notifyId}")
    public CommonResult<Boolean> readNotifyMessage(@PathVariable("notifyId") Long notifyId) {
        notifyMessageService.readNotifyMessage(notifyId);
        return CommonResult.success(true);
    }
    @GetMapping("/count/unread/user")
    public CommonResult<Integer> countUnreadNotifyMessage() {
        return CommonResult.success(notifyMessageService.countUnreadNotify(getLoginUserMemberId()));
    }

    @PutMapping("/read-all")
    public CommonResult<Boolean> readAllNotifyMessage() {
        notifyMessageService.readAllNotifyMessage(getLoginUserMemberId());
        return CommonResult.success(true);
    }


}
