package viosmash.core.filter;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import viosmash.core.utils.LoginUser;
import viosmash.core.utils.SecurityUtils;
import viosmash.json.JsonUtils;

import java.util.Collections;

@Component
public class WebFluxAuthTokenFilter extends AuthenticationWebFilter {


    public WebFluxAuthTokenFilter(ReactiveAuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain filterChain) {
        String token = extractToken(exchange.getRequest().getHeaders().getFirst("Authorization"));
        String loginUserJson = SecurityUtils.obtainLoginUser(exchange.getRequest());

        if(loginUserJson == null) {
            return filterChain.filter(exchange);
        }
        LoginUser loginUser = JsonUtils.toObject(loginUserJson, LoginUser.class);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                loginUser, null, Collections.emptyList()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return Mono.empty();
    }

    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}
