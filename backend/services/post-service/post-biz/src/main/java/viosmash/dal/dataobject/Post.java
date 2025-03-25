package viosmash.dal.dataobject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.config.JsonListConverter;
import viosmash.enums.PostType;

import java.util.List;

@Data
@Entity
@Table(name=  "posts")
@Accessors(chain = true)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @NotNull
    private Long userId;

    private Long groupId;

    @Convert(converter = JsonListConverter.class)
    private List<String> imageUrls;

    @Convert(converter = JsonListConverter.class)
    private List<String> fileUrls;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PostType postType;

    private Long sharePostId;

    private Boolean postOnWall;
}
