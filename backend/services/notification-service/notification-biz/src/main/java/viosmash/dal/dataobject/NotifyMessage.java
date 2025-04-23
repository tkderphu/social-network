package viosmash.dal.dataobject;


import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;
import viosmash.converter.JsonObjectConverter;
import viosmash.date.DateUtils;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.Map;

@Table(name = "tblNotifyMessage")
@Entity
@Accessors(chain = true)
@Data
public class NotifyMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    private LocalDateTime createdAt;
    private Boolean read;

    @ManyToOne
    @JoinColumn(name = "notifyTemplateId", nullable = false)
    private NotifyTemplate notifyTemplate;

    @Convert(converter = JsonObjectConverter.class)
    @Column(nullable = false)
    private Map<String, Object> templateParams;


    public String getContent() {
        templateParams.put("time", DateUtils.timeAgo(createdAt));
        return StringUtils.formatPlaceHolders(notifyTemplate.getContent(), templateParams);
    }
}
