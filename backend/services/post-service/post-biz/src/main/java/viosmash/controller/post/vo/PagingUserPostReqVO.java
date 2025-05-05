package viosmash.controller.post.vo;

import lombok.Data;
import viosmash.pojo.PagingRequest;

@Data
public class PagingUserPostReqVO extends PagingRequest {
    private Long userId;
}
