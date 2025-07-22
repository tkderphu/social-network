package com.viosmash.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableConfigurationProperties(CloudinaryProperties.class)
public class CloudinaryConfig {

    private final CloudinaryProperties cloudinaryProperties;

    public CloudinaryConfig(CloudinaryProperties cloudinaryProperties) {
        this.cloudinaryProperties = cloudinaryProperties;
    }

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudinaryProperties.getCloud_name());
        config.put("api_secret", cloudinaryProperties.getApi_secret());
        config.put("api_key", cloudinaryProperties.getApi_key());
        Cloudinary cloudinary =  new Cloudinary(
                "cloudinary://135635477598822:-jJ8OQ_ZNDzdbWD9j7f9iw0cyXU@dge2yenvw"
        );
        return cloudinary;
    }
}