package com.viosmash.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.cloudinary")
@Data
public class CloudinaryProperties {
    private String cloud_name;
    private String api_key;
    private String api_secret;
    private String upload_prefix;
    private String callback;
}
