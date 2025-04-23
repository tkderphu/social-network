package viosmash.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.template.NotifyTemplateCreatedReqVO;
import viosmash.dal.dataobject.NotifyTemplate;
import viosmash.enums.NotificationType;
import viosmash.pojo.CommonResult;
import viosmash.service.notify.NotifyTemplateService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications/templates")
@Validated
public class NotifyTemplateController {
    private final NotifyTemplateService notifyTemplateService;

    @PostMapping
    public CommonResult<NotifyTemplate> createTemplate(@Valid  @RequestBody NotifyTemplateCreatedReqVO req) {
        NotifyTemplate notifyTemplate = notifyTemplateService.createNotifyTemplate(req);
        return CommonResult.success(notifyTemplate);
    }

    @GetMapping
    public CommonResult<List<NotifyTemplate>> getListTemplate() {
        return CommonResult.success(notifyTemplateService.getListNotifyTemplate());
    }

    @GetMapping("/types")
    public CommonResult<List<NotificationType>> getListTemplateId() {
        return CommonResult.success(CollUtils.convertList(NotificationType.values()));
    }
}
