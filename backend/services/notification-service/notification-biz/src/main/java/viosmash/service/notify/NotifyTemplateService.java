package viosmash.service.notify;

import viosmash.controller.vo.template.NotifyTemplateCreatedReqVO;
import viosmash.dal.dataobject.NotifyTemplate;

import java.util.List;

public interface NotifyTemplateService {
    NotifyTemplate createNotifyTemplate(NotifyTemplateCreatedReqVO req);
    NotifyTemplate getNotifyTemplateById(String id);
    List<NotifyTemplate> getListNotifyTemplate();

}
