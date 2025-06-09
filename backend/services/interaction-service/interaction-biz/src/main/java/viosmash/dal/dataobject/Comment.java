package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;
import viosmash.converter.JsonObjectConverter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
@Table(name = "tblComment")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @Convert(converter = JsonObjectConverter.class)
    private List<String> mediaUrls;
    private LocalDateTime createdDate;

    private Long userId;

    private Long replyCommentId;

    private Long postId;

}
