package viosmash.core.rpc;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import viosmash.core.utils.LoginUser;
import viosmash.core.utils.SecurityUtils;
import viosmash.json.JsonUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
public class LoginUserRequestInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        LoginUser loginUser = SecurityUtils.getLoginUserMember();

        if(loginUser == null) {
            return;
        }
        try {
            String userStr = JsonUtils.toStringJson(loginUser);
            String userEncoder = URLEncoder.encode(userStr, StandardCharsets.UTF_8.name());
            requestTemplate.header(SecurityUtils.LOGIN_USER, userEncoder);
        } catch (Exception ex) {
            log.error("[apply][Store LoginUser({}) to Header before send occur error({})]", loginUser, ex);
            throw new RuntimeException(ex);
        }
    }
}
