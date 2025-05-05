package viosmash.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Slf4j
@RequiredArgsConstructor
public class TestController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/chat.send")
    public String sendMessage(String message) {
        log.info("received message: {}", message);
        simpMessagingTemplate.convertAndSend("/topic/messages", message);
        return "Received: " + message;
    }
    @GetMapping("/api/chats/hello-world")
    @ResponseBody
    public String helloword() {
        simpMessagingTemplate.convertAndSend("/topic/greetings", "hello word");

        return "hello world";
    }
}
