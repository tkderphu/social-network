package viosmash.controller.v1.vo;

import lombok.Data;
import viosmash.pojo.api.post.PostDTO;

@Data
public class PostNotificationRespVO extends NotificationRespVO{
    private PostDTO post;
}
