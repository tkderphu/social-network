package viosmash;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import viosmash.api.UserApi;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.Member;
import viosmash.dal.dataobject.Message;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.dal.repo.UserConversationRepository;
import viosmash.enums.TopicChannel;
import viosmash.random.RandomUtils;
import viosmash.service.ConversationService;
import viosmash.service.MessageService;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
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
    private UserApi userApi;
    private StompSession session;

    @Autowired
    private MessageService messageService;

    @Autowired
    private ConversationRepository conversationRepository;
    @Autowired
    private UserConversationRepository userConversationRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ConversationService conversationService;


    @Test
    void test_create_message_when_between_two_user_did_not_establish_conversation() {
        MessageReqVO req = new MessageReqVO();
        req.setToUserId(1l);
        req.setSenderId(2l);
        req.setMessage("he");

        messageService.createMessage(req);

        Conversation oneBy = conversationRepository.findOneBy(1l, 2l);
        Assertions.assertNotNull(oneBy);
        log.info("conversation: {}", oneBy);
    }

    @Test
    void test_get_list_message() {
        Conversation conversation = new Conversation()
                .setType(Conversation.ConversationType.ONE_ONE);

        this.conversationRepository.save(conversation);
        Member member1 = new Member()
                .setUserId(1l).setConversationId(conversation.getId());

        Member member2 = new Member()
                .setUserId(2l).setConversationId(conversation.getId());

        this.userConversationRepository.save(member1);
        this.userConversationRepository.save(member2);


        List<Message> messages =new ArrayList<>();
        for(int i = 0; i < 50; i++) {
            messages.add(new Message().setMessage("hello world " + i)
                    .setConversationId(conversation.getId())
                    .setSenderId(1l));
        }

        this.messageRepository.saveAll(messages);

        List<MessageRespVO> listMessage = this.messageService.getListMessage(conversation.getId(), 0l, 20);
        log.info("list size [1,20]: {}", listMessage.size());
         listMessage = this.messageService.getListMessage(conversation.getId(), 20l, 20);
        log.info("list size [21, 40] :  {}", listMessage.size());
       listMessage = this.messageService.getListMessage(conversation.getId(), 40l, 20);
        log.info("list size [41, 50]{}", listMessage.size());
    }

    @Test
    void test_conversation() {
        Conversation conversation = new Conversation()
                .setType(Conversation.ConversationType.ONE_ONE);

        this.conversationRepository.save(conversation);
        Member member1 = new Member()
                .setUserId(1l).setConversationId(conversation.getId());

        Member member2 = new Member()
                .setUserId(2l).setConversationId(conversation.getId());

        this.userConversationRepository.save(member1);
        this.userConversationRepository.save(member2);

        Message message = new Message().setConversationId(conversation.getId())
                        .setMessage("hello world").setSenderId(1l);

        this.messageRepository.save(message);


        ConversationRespVO conversationRespVO = conversationService.getConversation(1l, 2l);

        log.info("data: {}", conversationRespVO);

    }

    @BeforeEach
    public void setup() throws Exception {
//        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(
//                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
//        stompClient.setMessageConverter(new MappingJackson2MessageConverter(JsonUtils.getObjectMapper()));
//
//        session = stompClient
//                .connectAsync("ws://localhost:" + port + "/chat.ws", new StompSessionHandlerAdapter() {
//                    @Override
//                    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
//                        log.info("Connected success");
//                        System.out.println("coonect: " + session.isConnected());
//                        session.subscribe("/topic/messages", new SendToUserRequestHandler());
//                    }
//
//                    @Override
//                    public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
//                        System.out.println("payload: " + new String(payload));
//                        throw new RuntimeException("Failure in WebSocket handling", exception);
//                    }
//                })
//                .get(3, TimeUnit.SECONDS);
//
//        System.out.println(session);
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
