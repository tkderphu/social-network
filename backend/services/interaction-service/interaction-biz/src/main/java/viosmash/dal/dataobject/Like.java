package viosmash.dal.dataobject;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private ObjectType objectType;
    @Column(nullable = false)
    private Long objectId;
    @Column(nullable = false)
    private LocalDateTime createdAt;
}
