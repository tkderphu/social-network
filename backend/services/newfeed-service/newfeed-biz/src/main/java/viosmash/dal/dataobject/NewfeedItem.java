package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "tblNewfeedItem")
public class NewfeedItem {
    @Id
    private Long id;
    private Long userId;
    private Long postId;
    private LocalDateTime timeline;
    private int isAdvertised;
}
