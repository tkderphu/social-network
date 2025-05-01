package viosmash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;
import viosmash.api.auth.TokenApi;

@SpringBootApplication
@EnableAsync
@EnableFeignClients(clients = {TokenApi.class})
public class ProfileApp {
    public static void main(String[] args) {
        SpringApplication.run(ProfileApp.class, args);
    }
}
