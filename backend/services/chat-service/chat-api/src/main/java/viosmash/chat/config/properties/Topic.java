package viosmash.chat.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "viosmash.topic")
public class Topic {
    private String newConversation;
    private String notification;
    private String chat;
}
