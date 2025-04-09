package viosmash.core.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import viosmash.core.utils.LoginUser;
import viosmash.core.utils.SecurityUtils;
import viosmash.json.JsonUtils;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class AuthTokenFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String loginUserJson = SecurityUtils.obtainLoginUser(request);
        if(loginUserJson == null) {
            filterChain.doFilter(request, response);
            return;
        }
        LoginUser loginUser = JsonUtils.toObject(loginUserJson, LoginUser.class);
        SecurityUtils.setUserLogin(loginUser, request);
        filterChain.doFilter(request, response);
    }
}
