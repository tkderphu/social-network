package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
@Table(name = "tblComment")
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private List<String> mediaUrls;
    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private Long userId;
    private Long replyCommentId;

    @Column(nullable = false)
    private Long postId;
}
