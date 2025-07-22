package viosmash.config;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.pattern.PathPattern;
import reactor.core.publisher.Mono;
import viosmash.collection.CollUtils;
import viosmash.core.filter.AuthTokenFilter;
import viosmash.core.filter.WebFluxAuthTokenFilter;
import viosmash.core.handler.AuthLogoutHandler;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static org.springframework.http.HttpMethod.GET;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final ApplicationContext context;
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final AccessDeniedHandler accessDeniedHandler;
    private final  AuthTokenFilter authTokenFilter;
    private final AuthLogoutHandler authLogoutHandler;
    private final SecurityProperties securityProperties;
    private final WebFluxAuthTokenFilter webFluxAuthTokenFilter;

    //for webflux
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) throws Exception {
        return http
                .authorizeExchange(exchanges ->
                        exchanges
                                .pathMatchers("/secure").authenticated()  // or your actual protected paths
                                .anyExchange().permitAll()
                )
                .addFilterBefore(webFluxAuthTokenFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .exceptionHandling(e ->
                        e.authenticationEntryPoint((exchange, ex) ->
                                Mono.fromRunnable(() -> {
                                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                                })
                        )
                )
                .build();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling((e) -> {
                    e.authenticationEntryPoint(authenticationEntryPoint)
                            .accessDeniedHandler(accessDeniedHandler);
                })
                .logout(out -> {
                    out.addLogoutHandler(authLogoutHandler).permitAll();
                })
                .authorizeHttpRequests(request -> {
//                    request.requestMatchers(securityProperties.getPermitAllUrls().toArray(new String[]{})).permitAll();

                    request.requestMatchers("/chat/ws").permitAll()
                            .anyRequest().permitAll();
                });
//        Map<HttpMethod, Set<String>> mapUrls = getAllUrls();
//        httpSecurity.authorizeHttpRequests(request -> {
//            request.requestMatchers(GET, ArrayUtils.toArray(String.class, mapUrls.get(GET))).permitAll()
//                    .requestMatchers(POST, ArrayUtils.toArray(String.class, mapUrls.get(POST))).permitAll()
//                    .requestMatchers(PUT, ArrayUtils.toArray(String.class, mapUrls.get(PUT))).permitAll()
//                    .requestMatchers(PATCH, ArrayUtils.toArray(String.class, mapUrls.get(PATCH))).permitAll()
//                    .requestMatchers(DELETE, ArrayUtils.toArray(String.class, mapUrls.get(DELETE))).permitAll()
//                    .requestMatchers(HEAD, ArrayUtils.toArray(String.class, mapUrls.get(HEAD))).permitAll()
//                    .requestMatchers("/swagger-ui/**")
//                    .permitAll()
//                    .requestMatchers("/v3/api-docs*/**")
//                    .permitAll()
//                    .anyRequest().authenticated();
//         });
        return httpSecurity.build();
    }


    /**
     * Extract all endpoint from controller
     * @return
     */
    private Map<HttpMethod, Set<String>> getAllUrls() {
        Map<HttpMethod, Set<String>> result = new HashMap<>();
        //get all request from controller
        RequestMappingHandlerMapping requestMappingHandlerMapping = (RequestMappingHandlerMapping)
                context.getBean("requestMappingHandlerMapping");
        Map<RequestMappingInfo, HandlerMethod> handlerMethodMap = requestMappingHandlerMapping.getHandlerMethods();
        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : handlerMethodMap.entrySet()) {
            //duyet moi request controller
            HandlerMethod handlerMethod = entry.getValue();
            if (!handlerMethod.hasMethodAnnotation(PermitAll.class)) {
                /**
                 * Method cho phep xu ly truong hop khong can dang nhap cung co the
                 * su dung he thong
                 * Neu phuong thuc hien tai co annotation Permitall tuc la cho phep su dung ngay ca khi khong
                 * dang nhap
                 * Con nguoc lai muon truy cap vao url khac can dang nhap
                 * khi dang nhap se co cac quyen khac nhau
                 */
                continue;
            }
            Set<String> urls = new HashSet<>();
            if (entry.getKey().getPatternsCondition() != null) {
                urls.addAll(entry.getKey().getPatternsCondition().getPatterns());
            }
            //get all pattern of request
            if (entry.getKey().getPathPatternsCondition() != null) {
                urls.addAll(CollUtils.convertList(entry.getKey().getPathPatternsCondition().getPatterns(), PathPattern::getPatternString));
            }
            if (urls.isEmpty()) {
                continue;
            }

            Set<RequestMethod> methods = entry.getKey().getMethodsCondition().getMethods();
            if (CollectionUtils.isEmpty(methods)) {
                putAll(result, GET, urls);
                putAll(result, HttpMethod.POST, urls);
                putAll(result, HttpMethod.PUT, urls);
                putAll(result, HttpMethod.DELETE, urls);
                putAll(result, HttpMethod.HEAD, urls);
                putAll(result, HttpMethod.PATCH, urls);
                continue;
            }

            //them request vao result
            entry.getKey().getMethodsCondition().getMethods().forEach(requestMethod -> {
                switch (requestMethod) {
                    case GET:
                        putAll(result, GET, urls);
                        break;
                    case POST:
                        putAll(result, HttpMethod.POST, urls);
                        break;
                    case PUT:
                        putAll(result, HttpMethod.PUT, urls);
                        break;
                    case DELETE:
                        putAll(result, HttpMethod.DELETE, urls);
                        break;
                    case HEAD:
                        putAll(result, HttpMethod.HEAD, urls);
                        break;
                    case PATCH:
                        putAll(result, HttpMethod.PATCH, urls);
                        break;
                }
            });
        }
        return result;
    }


    private void putAll(Map<HttpMethod, Set<String>> result, HttpMethod method, Set<String> urls) {
        if(result.containsKey(method)) {
            result.get(method).addAll(urls);
        } else {
            result.put(method, urls);
        }
    }

}