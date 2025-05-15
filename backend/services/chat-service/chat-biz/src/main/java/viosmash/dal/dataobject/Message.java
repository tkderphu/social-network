package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "tblMessage")
@Entity
@Data
@Accessors(chain = true)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    @ManyToOne
    @JoinColumn(name = "conversationId")
    private Conversation conversation;

    private String message;

    @Convert(converter = JsonListConverter.class)
    private List<String> images;

    @Convert(converter = JsonListConverter.class)
    private List<String> files;

    private LocalDateTime createdAt;
}
