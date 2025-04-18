package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.NotifyTemplate;

import java.util.List;
import java.util.Map;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class SendNotifyServiceImpl implements SendNotifyService{
    private final NotifyTemplateService notifyTemplateService;
    private final NotifyMessageService notifyMessageService;
    @Override
    public void sendNotifyMessage(Long userId, String templateId, Map<String, Object> templateParams) {
        NotifyTemplate notifyTemplate = this.notifyTemplateService.getNotifyTemplateById(templateId);
        validTemplateParams(notifyTemplate, templateParams);
         notifyMessageService.createNotifyMessage(userId, notifyTemplate, templateParams);

    }


    private void validTemplateParams(NotifyTemplate notifyTemplate, Map<String, Object> templateParams) {
        List<String> params = notifyTemplate.getParams();
        params.forEach(param -> {
            if(!templateParams.containsKey(param)) {
                throw exception(
                        400,
                        "Notify template params missing key: " + param
                );
            }
        });
    }
    @Override
    public void notifySingleMessage(Long userId, String templateId, Map<String, Object> templateParams) {
        NotifyTemplate notifyTemplate = this.notifyTemplateService.getNotifyTemplateById(templateId);
        validTemplateParams(notifyTemplate, templateParams);
        notifyMessageService.createNotifyMessage(userId, notifyTemplate, templateParams);
    }
}
