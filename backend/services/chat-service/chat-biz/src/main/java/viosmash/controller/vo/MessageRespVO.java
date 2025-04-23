package viosmash.controller.vo;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;
import viosmash.api.UserDTO;

import java.util.List;

@Data
@ToString
@Accessors(chain = true)
public class MessageRespVO {
    private Long id;

    private UserDTO sender;

    private String message;

    private List<String> images;

    private List<String> files;
}
