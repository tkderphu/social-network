package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import viosmash.collection.MapUtils;
import viosmash.dal.dataobject.NotifyTemplate;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.pojo.api.notification.NotificationType;
import viosmash.service.mail.MailService;

import java.util.List;
import java.util.Map;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
@Slf4j
public class SendNotifyServiceImpl implements SendNotifyService{
    private final NotifyMessageService notifyMessageService;
    private final MailService mailService;
    private final TemplateEngine templateEngine;
    @Override
    public void sendNotifyMessage(Long userId, NotificationType type, Map<NotificationDto.KeyParams, Object> templateParams) {
         notifyMessageService.createNotifyMessage(userId,type, MapUtils.convert(templateParams, NotificationDto.KeyParams::name));
        System.out.println("----------create message ok--------------");
    }


    private void validTemplateParams(NotifyTemplate notifyTemplate, Map<NotificationDto.KeyParams, Object> templateParams) {
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
    public void mailNotifySingleMessage(Map<NotificationDto.KeyParams, Object> properties,
                                        NotificationType type,
                                        String subject) {
        log.info("[mailNotifySingleMessage](send mail begin)");
        Context context = new Context();
        context.setVariables(MapUtils.convert(properties, NotificationDto.KeyParams::name));
        String htmlContent = templateEngine.process(type.getFileNameHtml(), context);
        mailService.sendMail((String)properties.get("email"), subject, htmlContent);
        log.info("[mailNotifySingleMessage](send mail end)");

    }
}
