package viosmash.event.friend.request;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static viosmash.EventConstant.*;

@Configuration
public class RequestQueue {
    public Queue requestCreatedFriendQueue() {
        return new Queue(
                CREATE_REQUEST_FRIEND_REQUEST + QUEUE_SUFFIX
        );
    }

    @Bean
    public DirectExchange requestCreatedFriendQueueDE() {
        return new DirectExchange(CREATE_REQUEST_FRIEND_REQUEST + DIRECT_SUFFIX);
    }
    @Bean
    public Binding bindingRequestCreatedFriendQueue(Queue requestCreatedFriendQueue, DirectExchange requestCreatedFriendQueueDE) {
        return BindingBuilder
                .bind(requestCreatedFriendQueue)
                .to(requestCreatedFriendQueueDE)
                .with(CREATE_REQUEST_FRIEND_REQUEST + ROU_SUFFIX);
    }

}
