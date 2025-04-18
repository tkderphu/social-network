package viosmash;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import viosmash.api.ProfileApi;

import java.lang.reflect.Type;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@EnableWebSocket
public class WebsocketTest {
    @LocalServerPort
    private int port;

    @MockitoBean
    private ProfileApi profileApi;
    private StompSession session;

    @BeforeEach
    public void setup() throws Exception {
        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(
                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
        stompClient.setMessageConverter(new StringMessageConverter());

        session = stompClient
                .connectAsync("ws://localhost:" + port + "/ws", new StompSessionHandlerAdapter() {
                    @Override
                    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                        log.info("Connected success");
                        System.out.println("coonect: " + session.isConnected());
                        session.subscribe("/topic/messages", new SendToUserRequestHandler());
                    }

                    @Override
                    public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
                        System.out.println("payload: " + new String(payload));
                        throw new RuntimeException("Failure in WebSocket handling", exception);
                    }
                })
                .get(3, TimeUnit.SECONDS);

        System.out.println(session);
    }
    @Test
    public void testSendMessage() throws Exception {

        CompletableFuture<String> future = new CompletableFuture<>();
        session.subscribe("/topic/messages", new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                System.out.println("ko");
                log.info("headers: {}", headers);
                System.out.println(headers.getSubscription());
                return String.class;
            }


            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                System.out.println("📥 Client received: " + payload);
                future.complete((String) payload);
            }
        });


        // small delay to ensure subscription is active

        session.send("/app/chat.send", "Hello, WebSocket!");
        String value = future.get(5000, TimeUnit.SECONDS);
        System.out.println("result: " + value);
    }
}
