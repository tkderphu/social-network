package viosmash.dal.dataobject;

import java.time.LocalDateTime;

public class Group {
    private Long id;
    private String name;
    private Long ownerId;
    private LocalDateTime createdAt;
    private Boolean enableInspection;
}
