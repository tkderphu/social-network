package viosmash.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

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
}
