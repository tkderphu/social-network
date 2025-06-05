package viosmash.controller.v1.vo;

import lombok.Data;

@Data
public class LikeNotificationRespVO extends NotificationRespVO{
    private String type;
    private Object typeObj; //post, comment
}
