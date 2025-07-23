package com.viosmash.security;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import reactor.core.publisher.Mono;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class SecurityUtils {
    public static final String LOGIN_USER = "login-user";



    public static String obtainLoginUser(ServerHttpRequest request) {
        try {
            String urlEncoder = request.getHeaders().getFirst(LOGIN_USER);
            if(urlEncoder == null || urlEncoder.isEmpty()) return null;
            String loginUser = URLDecoder.decode(urlEncoder, StandardCharsets.UTF_8.name());
            return loginUser;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static Mono<LoginUser> getLoginUserMember() {
        Mono<LoginUser> objectMono = ReactiveSecurityContextHolder.getContext()
                .flatMap(securityContext -> {
                    LoginUser loginUser = (LoginUser) securityContext.getAuthentication().getPrincipal();
                    return Mono.just(loginUser);
                });
        return objectMono;
    }
    public static Mono<Long> getLoginUserMemberId() {
        return getLoginUserMember()
                .flatMap(loginUser -> Mono.just(loginUser.getUserId()));
    }
}