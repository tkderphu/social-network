package viosmash.servlet;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import viosmash.json.JsonUtils;
import viosmash.pojo.CommonResult;


public class ServletUtils {


    public  static void writeJson(HttpServletResponse response, CommonResult<?> object) {
        String content = JsonUtils.toStringJson(object);
        write(response,object.getCode(), content, MediaType.APPLICATION_JSON_UTF8_VALUE);
    }

    public static HttpServletRequest getRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if(!(requestAttributes instanceof ServletRequestAttributes)) {
            return null;
        }
        return ((ServletRequestAttributes) requestAttributes).getRequest();
    }

    public static String getBaseUrl() {
        HttpServletRequest request = getRequest();
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return baseUrl;
    }
    public static String getBaseUrl(String param) {
        HttpServletRequest request = getRequest();
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return baseUrl;
    }

    public static String getUserAgent(HttpServletRequest request) {
        String ua = request.getHeader("User-Agent");
        return ua != null ? ua : "";
    }

    public static String getIpAddress() {
        HttpServletRequest request = getRequest();
        if(request == null) {
            return null;
        }
        return request.getRemoteAddr();
    }

    public static String getUserAgent() {
        HttpServletRequest request = getRequest();
        if(request != null) {
            return getUserAgent(request);
        }
        return null;
    }

    private static void write(HttpServletResponse response, int code, String content, String contentType) {
        response.setContentType(contentType);
        response.setStatus(code);
        try {
            response.getWriter().write(content);
            response.getWriter().flush();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}