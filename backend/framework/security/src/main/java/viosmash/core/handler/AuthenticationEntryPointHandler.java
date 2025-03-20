package viosmash.core.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import viosmash.pojo.CommonResult;
import viosmash.servlet.ServletUtils;

public class AuthenticationEntryPointHandler implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) {
        CommonResult<?> error = CommonResult.error("Unauthorized", HttpStatus.UNAUTHORIZED.value());

        ServletUtils.writeJson(response, error);
    }
}
