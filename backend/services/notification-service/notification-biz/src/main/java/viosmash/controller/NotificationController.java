package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.vo.NotificationMessageRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.notification.NotificationService;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@RestController
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public CommonResult<List<NotificationMessageRespVO>> getListNotification(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "50") int limit
    ) {
        return CommonResult.success(notificationService.getListNotification(
                SecurityUtils.getLoginUserMemberId(),
                page,
                limit
        ));
    }
    @GetMapping("/unread")
    public CommonResult<List<NotificationMessageRespVO>> getListUnreadNotification(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "50") int limit
    ) {
        return CommonResult.success(notificationService.getListUnreadNotification(
                SecurityUtils.getLoginUserMemberId(),
                page,
                limit
        ));
    }
    @GetMapping("/count/unread")
    public CommonResult<Integer> getNumberUnreadNotification() {
        return CommonResult.success(notificationService.countUnreadNotification(
                SecurityUtils.getLoginUserMemberId()
        ));
    }

    @PutMapping("/read/{id}")
    public CommonResult<Boolean> getNumberUnreadNotification(
            @PathVariable("id") Long id
    ) {
        notificationService.updateReadNotification(id);
        return CommonResult.success(true);
    }

    @PutMapping("/read-all")
    public CommonResult<Boolean> getNumberUnreadNotification(
            @RequestBody Collection<Long> ids) {
        notificationService.updateAllNotification(ids);
        return CommonResult.success(true);
    }

    @DeleteMapping("/{id}")
    public CommonResult<Boolean> deleteNotification(
            @PathVariable("id") Long id
    ) {
        notificationService.deleteNotification(id);
        return CommonResult.success(true);
    }
}
