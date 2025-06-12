package viosmash.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.v1.vo.CommentNotificationSettingReqVO;
import viosmash.controller.v1.vo.PostNotificationSettingReqVO;
import viosmash.controller.v1.vo.VoteNotificationSettingReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.v1.NotificationSetting;
import viosmash.pojo.CommonResult;
import viosmash.service.notification.NotificationSettingService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications/setting")
public class NotificationSettingController {
    private final NotificationSettingService notificationSettingService;

    @PutMapping("/push")
    public CommonResult<Boolean> updatePush(@RequestBody Boolean enable) {
        notificationSettingService.updatePushNotification(
                SecurityUtils.getLoginUserMemberId(),
                enable
        );
        return CommonResult.success(true);
    }
    @PutMapping("/sound")
    public CommonResult<Boolean> updateSound(@RequestBody Boolean enable) {
        notificationSettingService.updateSoundNotification(
                SecurityUtils.getLoginUserMemberId(),
                enable
        );
        return CommonResult.success(true);
    }

    @PutMapping("/post")
    public CommonResult<Boolean> updatePost(@RequestBody PostNotificationSettingReqVO req) {
        notificationSettingService.updatePostNotification(
                SecurityUtils.getLoginUserMemberId(),
                req
        );
        return CommonResult.success(true);
    }
    @PutMapping("/comment")
    public CommonResult<Boolean> updateComment(@RequestBody CommentNotificationSettingReqVO req) {
        notificationSettingService.updateCommentNotification(
                SecurityUtils.getLoginUserMemberId(),
                req
        );
        return CommonResult.success(true);
    }
    @PutMapping("/vote")
    public CommonResult<Boolean> updateVote(@RequestBody VoteNotificationSettingReqVO req) {
        notificationSettingService.updateVoteNotification(
                SecurityUtils.getLoginUserMemberId(),
                req
        );
        return CommonResult.success(true);
    }
    @GetMapping
    public CommonResult<NotificationSetting> getNotificationSetting() {
        NotificationSetting notificationSetting = this.notificationSettingService
                .getNotificationSetting(SecurityUtils.getLoginUserMemberId());
        return CommonResult.success(notificationSetting);
    }

}
