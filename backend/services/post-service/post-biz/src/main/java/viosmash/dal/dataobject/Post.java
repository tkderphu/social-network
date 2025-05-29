package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;
import viosmash.post.enums.PostPrivacy;
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

    @Column(nullable = false)
    private Long userId;

    private Long groupId;

    @Convert(converter = JsonListConverter.class)
    private List<String> mediaUrls;

    @Enumerated(EnumType.STRING)
    private PostType postType;

    @Enumerated(EnumType.STRING)
    private PostPrivacy postPrivacy;

    private Long sharePostId;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    private int downVote;
    private int upVote;

}
