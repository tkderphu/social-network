package viosmash;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.GsonMessageConverter;
import org.springframework.messaging.converter.JsonbMessageConverter;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import viosmash.api.ProfileApi;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.enums.TopicChannel;
import viosmash.json.JsonUtils;
import viosmash.random.RandomUtils;
import viosmash.service.MessageService;
import viosmash.service.MessageServiceImpl;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@EnableWebSocket
public class WebsocketTest extends BaseTest{
    @LocalServerPort
    private int port;

    @MockitoBean
    private ProfileApi profileApi;
    private StompSession session;

    @Autowired
    private MessageService messageService;
    @BeforeEach
    public void setup() throws Exception {
        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(
                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
        stompClient.setMessageConverter(new MappingJackson2MessageConverter(JsonUtils.getObjectMapper()));

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

        CompletableFuture<Conversation> future = new CompletableFuture<>();
        session.subscribe("/topic/messages", new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                System.out.println("ko");
                log.info("headers: {}", headers);
                System.out.println(headers.getSubscription());
                return Conversation.class;
            }


            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                System.out.println("📥 Client received: " + payload);
                future.complete((Conversation) payload);
            }
        });


        // small delay to ensure subscription is active

        session.send("/app/chat.send", "Hello, WebSocket!");
        Conversation value = future.get(5000, TimeUnit.SECONDS);
        System.out.println("result: " + value);
    }


    @Test
    void testSendMessage_WithDB() throws ExecutionException, InterruptedException, TimeoutException {
        CompletableFuture<MessageRespVO> futureUser1 = new CompletableFuture<>();
        session.subscribe(String.format(TopicChannel.USER_CHAT_NEW_CONVERSATION, 1l), new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                System.out.println("ko");
                log.info("headers: {}", headers);
                return ConversationRespVO.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                System.out.println("📥 Client received: " + payload);
                ConversationRespVO conversation = (ConversationRespVO)payload;

//                futureUser1.complete(conversation);
            }
        });


        session.subscribe(String.format(TopicChannel.USER_CHAT, 1l), new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                System.out.println("connect recevie message");
                return MessageRespVO.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                MessageRespVO messageRespVO = (MessageRespVO) payload;
                System.out.println("message: " + messageRespVO);
            }
        });
        MessageReqVO req = RandomUtils.randomObject(MessageReqVO.class, (m) -> {
            m.setSenderId(1l);
            m.setToUserId(2l);
            m.setConversationId(null);
        });
        messageService.createMessage(req);

//        Conversation conversation = futureUser1.get(5000, TimeUnit.SECONDS);

//        System.out.println(conversation);

//        new Scanner(System.in).nextLine();
    }


}
