package viosmash;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import viosmash.api.auth.AuthTokenDTO;
import viosmash.api.auth.TokenApi;
import viosmash.core.utils.LoginUser;
import viosmash.core.utils.SecurityUtils;
import viosmash.object.BeanUtil;

import java.util.Collections;
import java.util.Optional;

@Configuration
@EnableWebSocketMessageBroker
@Slf4j
@EnableConfigurationProperties(WebsocketProperties.class)
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    @Resource
    private WebsocketProperties websocketProperties;
    @Autowired
    private TokenApi tokenApi;
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        log.info("WEBSOCKET PROPERTIES: {}", websocketProperties);
        registry.addEndpoint(websocketProperties.getEndpoint())
                .setAllowedOrigins("*");
//                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(websocketProperties.getDestinationPrefix());
        registry.setApplicationDestinationPrefixes(websocketProperties.getAppPrefix());
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (accessor.getCommand().equals(StompCommand.CONNECT)) {
                    Optional.ofNullable(accessor.getNativeHeader("Authorization"))
                            .ifPresent(ah -> {
                                String token = SecurityUtils.obtainToken(ah.get(0));
                                AuthenticationToken jwtAuthentication = getJWTAuthenticationToken(token);
                                if (jwtAuthentication != null) {
                                    accessor.setUser(jwtAuthentication); // Set the authenticated user
                                    log.info("set authentication for websocket");
                                } else {
                                    log.warn("Invalid JWT Token");
                                }
                            });
                }
                return message;
            }
        });
    }

    private AuthenticationToken getJWTAuthenticationToken(String token) {
        AuthTokenDTO authTokenDTO = this.tokenApi.checkAccessToken(token);
        LoginUser loginUser = BeanUtil.copy(authTokenDTO, LoginUser.class);
        AuthenticationToken authenticationToken = new AuthenticationToken(
                Collections.emptyList(),loginUser
        );
        log.info("user authen in websocket: {}", authenticationToken);

        return authenticationToken;
    }
}
