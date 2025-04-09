package viosmash.filter.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import viosmash.LoginUser;
import viosmash.pojo.CommonResult;
import viosmash.utils.SecurityFrameworkUtils;

import java.net.URI;

@Component
@RequiredArgsConstructor
public class AuthenticationTokenFilter implements WebFilter {
    private final WebClient webClient;
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String token = SecurityFrameworkUtils.obtainTokenFromHeader(exchange);
        if(token == null || token.isEmpty()) {
            return chain.filter(exchange);
        }
        return webClient.get().uri(uri -> {
                    URI accessToken = uri.queryParam("accessToken", token).build();
                    System.out.println(accessToken);
                    return accessToken;
        }).retrieve().bodyToMono(LoginUser.class)
                .flatMap(loginUser -> {
                    if(loginUser == null || loginUser.isExpired()) {
                        return chain.filter(exchange);
                    }
                    ServerWebExchange newExchange = exchange.mutate().request(builder -> {
                        SecurityFrameworkUtils.setLoginUserHeader(builder, loginUser);
                    }).build();
                    return chain.filter(newExchange);
                });
    }
}
