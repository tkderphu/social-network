package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.vo.template.NotifyTemplateCreatedReqVO;
import viosmash.dal.dataobject.NotifyTemplate;
import viosmash.dal.repo.NotifyTemplateRepository;
import viosmash.exception.ServiceException;
import viosmash.string.StringUtils;

import java.util.List;
import java.util.regex.Pattern;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class NotifyTemplateServiceImpl implements NotifyTemplateService {
    private final Pattern PATTERN = Pattern.compile("\\{\\{(.*?)}}");
    private final NotifyTemplateRepository notifyTemplateRepository;
    @Override
    public NotifyTemplate createNotifyTemplate(NotifyTemplateCreatedReqVO req) {
        try {
            getNotifyTemplateById(req.getId());
            throw exception(500, "Notify template existed with id: " + req.getId());
        } catch (ServiceException ex) {
            NotifyTemplate template = new NotifyTemplate().setId(req.getId())
                    .setName(req.getName())
                    .setContent(req.getContent())
                    .setParams(StringUtils.extractPlaceholders(req.getContent(), PATTERN));
            return this.notifyTemplateRepository.save(template);
        }
    }

    @Override
    public NotifyTemplate getNotifyTemplateById(String id) {
        return this.notifyTemplateRepository.findById(id)
                .orElseThrow(() -> exception(404, "not found template with id: " + id));
    }

    @Override
    public List<NotifyTemplate> getListNotifyTemplate() {
        return this.notifyTemplateRepository.findAll();
    }
}
