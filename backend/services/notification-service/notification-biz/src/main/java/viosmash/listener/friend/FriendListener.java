package viosmash.listener.friend;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListeners;
import org.springframework.stereotype.Component;
import viosmash.EventConstant;
import viosmash.event.friend.FriendEvent;
import viosmash.json.JsonUtils;

import static viosmash.EventConstant.*;

@Component
public class FriendListener {

    @RabbitListener(queues = CREATE_REQUEST_FRIEND_REQUEST + QUEUE_SUFFIX)
    public void listenCreatedRequestFriend(String json) {
        FriendEvent friendEvent = JsonUtils.toObject(json, FriendEvent.class);
    }

    @RabbitListener(queues = ACCEPT_FRIENDS_REQUEST + QUEUE_SUFFIX)
    public void listenAcceptFriendRequest(String json) {
        FriendEvent friendEvent = JsonUtils.toObject(json, FriendEvent.class);

    }
}
