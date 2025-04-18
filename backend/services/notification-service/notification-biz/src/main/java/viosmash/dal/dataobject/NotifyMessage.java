package viosmash.dal.dataobject;


import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.converter.JsonObjectConverter;

import java.time.LocalDateTime;
import java.util.Map;

@Table(name = "tblNotifyMessage")
@Entity
@Accessors(chain = true)
@Data
public class NotifyMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private Boolean read;
    private String content;

}
