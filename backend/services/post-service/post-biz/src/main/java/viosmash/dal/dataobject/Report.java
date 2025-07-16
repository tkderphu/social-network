package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.post.enums.ReportType;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tblReport")
@Accessors(chain = true)
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long postId;
    private String reason;

    private ReportType reportType;
    private LocalDateTime reportedAt;
}
