package viosmash.config;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.Collections;
import java.util.List;

@ConfigurationProperties(prefix = "viosmash.security")
@Validated
@Data
public class SecurityProperties {

    @NotEmpty
    private String tokenHeader = "Authorization";

    private List<String> permitAllUrls = Collections.emptyList();

    private Integer passwordEncoderLength = 4;

}
