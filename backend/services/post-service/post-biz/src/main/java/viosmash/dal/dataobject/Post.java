package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;
import viosmash.converter.JsonObjectConverter;
import viosmash.post.enums.PostPrivacy;
import viosmash.post.enums.PostType;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Data
@Entity
@Table(name=  "tblPost")
@Accessors(chain = true)
public class Post{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @Column(nullable = false)
    private Long userId;

    private Long groupId;

    @Convert(converter = JsonObjectConverter.class)
    private List<String> mediaUrls;

    @Enumerated(EnumType.STRING)
    private PostType postType;


    @Enumerated(EnumType.STRING)
    private PostPrivacy postPrivacy;

    private Long sharePostId;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    private Boolean visible;
    private Boolean disable;

    //store directly instead of fetch from other services and calculate for improving performance
    private Double hotScore;
    private int votes;
    private int comments;
    private int shares;




    public void calculateHotScore() {
        int score = votes;
        int sign = Integer.compare(score, 0); // -1, 0, or 1

        // Avoid log(0) by ensuring abs(score) >= 1
        double order = Math.log10(Math.max(Math.abs(score), 1));

        // Epoch timestamp of the post (in seconds)
        long epochSeconds = createdDate.toEpochSecond(ZoneOffset.UTC);

        // Reference time: 1134028003 is the epoch for Dec 8, 2005
        long secondsSinceEpoch = epochSeconds - 1134028003;

        this.hotScore = sign * order + secondsSinceEpoch / 45000.0;
    }

}
