package viosmash.core.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

public class SecurityUtils {

    public static final String AUTHENTICATION_HEADER = "Authorization";
    public static final String AUTHORIZATION_TOKEN_HEADER = "Bearer";
    public static final String LOGIN_USER = "login-user";


    public static String obtainLoginUser(HttpServletRequest request) {
        String urlEncoder = request.getHeader(LOGIN_USER);
        if(urlEncoder == null || urlEncoder.isEmpty()) return null;
        String loginUser = URLEncoder.encode(urlEncoder, StandardCharsets.UTF_8);
        return loginUser;
    }

    public static String obtainToken(HttpServletRequest request) {
        String authHeader = request.getHeader(AUTHENTICATION_HEADER);
        return obtainToken(authHeader);
    }

    public static String obtainToken(String authHeaderValue) {
        String authHeader = authHeaderValue;
        if(authHeader == null) return null;
        if(!authHeader.startsWith(AUTHORIZATION_TOKEN_HEADER)) return null;
        return authHeader.substring(7);
    }

    public static LoginUser getLoginUserMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            return (LoginUser) authentication.getPrincipal();
        }
        return null;
    }
    public static Long getLoginUserMemberId() {
        LoginUser userMember = getLoginUserMember();
        return userMember != null ? userMember.getId() : null;
    }



    private static Authentication setAuthentication(LoginUser loginUser, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser, null, Collections.emptyList()
        );
        authenticationToken.setDetails(new WebAuthenticationDetails(request));
        return authenticationToken;
    }

    public static void setUserLogin(LoginUser loginUser, HttpServletRequest request) {
        Authentication authentication = setAuthentication(loginUser, request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}