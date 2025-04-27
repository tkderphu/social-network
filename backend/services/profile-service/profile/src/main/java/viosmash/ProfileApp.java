package viosmash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import viosmash.api.auth.TokenApi;

@SpringBootApplication
@EnableFeignClients(clients = {TokenApi.class})
public class ProfileApp {
    public static void main(String[] args) {
        SpringApplication.run(ProfileApp.class, args);
    }
}
