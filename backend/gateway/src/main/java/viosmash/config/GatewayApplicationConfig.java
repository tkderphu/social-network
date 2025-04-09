package viosmash.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import viosmash.api.auth.TokenApi;
import viosmash.enums.ApiConstant;

@Configuration
public class GatewayApplicationConfig {

    @Bean
    @LoadBalanced
    public WebClient webClient() {
        return WebClient.builder().baseUrl(TokenApi.URL_CHECK).build();
    }
}
