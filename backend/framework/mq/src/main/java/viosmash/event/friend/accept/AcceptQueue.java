package viosmash.event.friend.accept;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static viosmash.EventConstant.*;

@Configuration
public class AcceptQueue {
    public Queue acceptRequestCreatedFriendQueue() {
        return new Queue(
                ACCEPT_FRIENDS_REQUEST + QUEUE_SUFFIX
        );
    }

    @Bean
    public DirectExchange acceptRequestCreatedFriendQueueDE() {
        return new DirectExchange(ACCEPT_FRIENDS_REQUEST + DIRECT_SUFFIX);
    }
    @Bean
    public Binding bindingAcceptRequestCreatedFriendQueue(Queue acceptRequestCreatedFriendQueue, DirectExchange acceptRequestCreatedFriendQueueDE) {
        return BindingBuilder
                .bind(acceptRequestCreatedFriendQueue)
                .to(acceptRequestCreatedFriendQueueDE)
                .with(ACCEPT_FRIENDS_REQUEST + ROU_SUFFIX);
    }

}
