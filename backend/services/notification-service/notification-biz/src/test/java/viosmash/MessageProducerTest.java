package viosmash;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.event.auth.UserCreated;
import viosmash.test.MessageProducer;

import static org.mockito.Mockito.*;

@SpringBootTest
class MessageProducerTest {

    @MockitoBean
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private MessageProducer messageProducer;

    @Test
    void testSendMessage() {
        // Arrange
        String exchange = "test-exchange";
        String routingKey = "test-routing-key";
        UserCreated userCreated = new UserCreated()
                .setUserId(1l).setSex("test").setFirstName("[hi")
                        .setLastName("test");

        // Act
        messageProducer.send(exchange, routingKey, userCreated);

        // Assert
        verify(rabbitTemplate, times(1)).convertAndSend(exchange, routingKey, userCreated);


        ArgumentCaptor<UserCreated> captor = ArgumentCaptor.forClass(UserCreated.class);
        verify(rabbitTemplate).convertAndSend(eq("test-exchange"), eq("test-routing-key"), captor.capture());

        System.out.println(captor.getValue());
    }
}
