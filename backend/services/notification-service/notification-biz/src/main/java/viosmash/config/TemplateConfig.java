package viosmash.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import viosmash.enums.NotificationTemplate;

@Component
@RequiredArgsConstructor
public class TemplateConfig {
    private final TemplateEngine templateEngine;

    public String parseHtml(NotificationTemplate template, Context context) {
        String html = templateEngine.process(template.getHtmlName(), context);
        return html;
    }
}
