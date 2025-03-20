package viosmash;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "viosmash.websocket")
public class WebsocketProperties {
    private String endpoint;
    private String appPrefix;
    private String destinationPrefix;
}
