package viosmash.post.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostUpdateDisableReqVO {
    private Long userId;
    private Long groupId;
    private Boolean disable;
}
