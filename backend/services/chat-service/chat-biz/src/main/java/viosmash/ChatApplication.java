package viosmash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import viosmash.api.ProfileApi;
import viosmash.api.auth.TokenApi;
import viosmash.api.auth.UserApi;

@SpringBootApplication
@EnableFeignClients(clients = {ProfileApi.class, TokenApi.class, UserApi.class})
public class ChatApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChatApplication.class, args);
    }
}
