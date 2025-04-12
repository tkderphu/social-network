package viosmash.test;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    @RabbitListener(queues = "my-queue")
    public void receive(String message) {
        System.out.println("Received: " + message);
        // handle it...
    }
}
