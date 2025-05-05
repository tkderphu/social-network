package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;
import viosmash.post.enums.PostType;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name=  "tblPost")
@Accessors(chain = true)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    private Long userId;

    private Long groupId;

    @Convert(converter = JsonListConverter.class)
    private List<String> mediaUrls;

    @Convert(converter = JsonListConverter.class)
    private List<String> fileUrls;

    @Enumerated(EnumType.STRING)
    private PostType postType;

    @ManyToOne
    @JoinColumn(name = "share_post_id")
    private Post sharePost;

    private Boolean postOnWall;

    private LocalDateTime createdDate;
}
