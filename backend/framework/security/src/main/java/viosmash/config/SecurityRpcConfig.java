package viosmash.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import viosmash.api.auth.TokenApi;
import viosmash.core.rpc.LoginUserRequestInterceptor;

@Configuration
@EnableFeignClients(clients = {TokenApi.class})
public class SecurityRpcConfig {
    @Bean
    public LoginUserRequestInterceptor loginUserRequestInterceptor() {
        return new LoginUserRequestInterceptor();
    }
}
