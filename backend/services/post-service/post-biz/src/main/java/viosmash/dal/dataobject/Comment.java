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
    private LocalDateTime createdDate;

    private Long userId;
    private Long replyUserId;

    @ManyToOne
    @JoinColumn(name = "root_comment_id")
    private Comment rootComment;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;
}
