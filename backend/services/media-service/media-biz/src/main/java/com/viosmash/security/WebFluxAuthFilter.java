package com.viosmash.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import viosmash.json.JsonUtils;

import java.util.Collections;

@Component
@Slf4j
public class WebFluxAuthFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String loginUserJson = SecurityUtils.obtainLoginUser(exchange.getRequest());
        log.info("login user: {}", loginUserJson);
        if(loginUserJson == null) {
            log.info("Unauthorized from webflux security");
            return chain.filter(exchange);
        }
        LoginUser loginUser = JsonUtils.toObject(loginUserJson, LoginUser.class);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                loginUser, null, Collections.emptyList()
        );
        SecurityContext context = new SecurityContextImpl(auth);

        return chain.filter(exchange)
                .contextWrite(ReactiveSecurityContextHolder.withSecurityContext(Mono.just(context)));
    }
}