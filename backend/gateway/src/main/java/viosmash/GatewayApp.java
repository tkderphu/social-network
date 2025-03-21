package viosmash;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.reactive.function.client.WebClient;
import viosmash.api.auth.AuthTokenDTO;
import viosmash.api.auth.TokenApi;
import viosmash.pojo.CommonResult;

@SpringBootApplication
@EnableFeignClients
public class GatewayApp {
    @Autowired
    private TokenApi tokenApi;
    public static void main(String[] args) {
        SpringApplication.run(GatewayApp.class, args);
    }
    @Autowired
    private WebClient webClient;


    @PostConstruct
    public void beforeRun() {
        try {
            CommonResult<AuthTokenDTO> fsdfsf =
                    tokenApi.checkAccessToken("fsdfsf");
            System.out.println(fsdfsf);
        } catch (Exception e) {
            System.out.println("message: ->" + e.getMessage());
        }
    }

}
