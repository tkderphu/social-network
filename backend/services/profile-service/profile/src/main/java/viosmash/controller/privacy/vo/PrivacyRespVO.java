package viosmash.controller.privacy.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.dal.dataobject.privacy.MessageEnum;

@Data
@Accessors(chain = true)
public class PrivacyRespVO {

    private Message message;
    private Post post;
    private Notification notification;

    @Data
    @Accessors(chain = true)
    public static class Message {
        private Long userId;
        private MessageEnum messageEnum;
        private String valueEnum;
    }
    @Data
    @Accessors(chain = true)
   public static class Post {
        private Long userId;
        private MessageEnum messageEnum;
        private String valueEnum;
    }
    @Data
    @Accessors(chain = true)
   public static class Notification {
        private Long userId;
        private MessageEnum messageEnum;
        private String valueEnum;
    }
}
