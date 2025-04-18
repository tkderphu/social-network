package viosmash.config;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import viosmash.enums.NotificationType;

@Component
@RequiredArgsConstructor
public class TemplateConfig {
    private final TemplateEngine templateEngine;

    public String parseHtml(NotificationType template, Context context) {
        return null;
    }
}
