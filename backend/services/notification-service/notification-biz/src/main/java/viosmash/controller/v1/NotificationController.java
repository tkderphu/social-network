package viosmash.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.v1.vo.NotificationRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.v1.NotificationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public CommonResult<List<NotificationRespVO>> getListNotification(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "15") int limit
    ) {
        List<NotificationRespVO> listNotification = notificationService.getListNotification(
                SecurityUtils.getLoginUserMemberId(),
                page,
                limit
        );
        return CommonResult.success(listNotification);
    }
    @GetMapping("/:unread")
    public CommonResult<List<NotificationRespVO>> getListNotification(
            @PathVariable("unread") Boolean unread,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "15") int limit
    ) {
        List<NotificationRespVO> listNotification = notificationService.getListNotification(
                SecurityUtils.getLoginUserMemberId(),
                unread,
                page,
                limit
        );
        return CommonResult.success(listNotification);
    }
    @GetMapping("/count/:unread")
    public CommonResult<Integer> countUnread(
            @PathVariable("unread") Boolean unread
    ) {
        int count = notificationService.countUnread(
                SecurityUtils.getLoginUserMemberId(),
                unread
        );
        return CommonResult.success(count);
    }

    @PutMapping("/read/one/:id")
    public CommonResult<Boolean> readNotification(
            @PathVariable("id") Long notificationId
    ) {
        notificationService.updateRead(notificationId);
        return CommonResult.success(true);
    }

    @PutMapping("/read/all")
    public CommonResult<Boolean> readAllNotification() {
        notificationService.updateReadAll(SecurityUtils.getLoginUserMemberId());
        return CommonResult.success(true);
    }
}
