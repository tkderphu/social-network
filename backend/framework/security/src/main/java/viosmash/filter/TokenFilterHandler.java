package viosmash.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import viosmash.api.AuthTokenDTO;
import viosmash.api.TokenApi;
import viosmash.utils.SecurityContextUtils;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class TokenFilterHandler extends OncePerRequestFilter {

    private final TokenApi tokenApi;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String accessToken = SecurityContextUtils.obtainTokenFromHeader(request);
        AuthTokenDTO authToken = tokenApi.getAccessToken(accessToken);
        if(authToken != null) {
            //do something
        }
        filterChain.doFilter(request, response);
    }
}
