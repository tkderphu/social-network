package viosmash.dal.dataobject;


import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "NotifyMessage")
@Accessors(chain = true)
@Data
public class NotifyMessage {
    @Id
    private String id;
    private String title;
    private String content;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private Boolean read;
}
