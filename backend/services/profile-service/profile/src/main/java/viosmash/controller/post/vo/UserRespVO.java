package viosmash.controller.post.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.SchoolEnum;

import java.util.Map;

@Data
@Accessors(chain = true)
public class UserRespVO {
    private String avatar;
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String gender;
    private String bio;
    private String dob;
    private String joined;
    private Map<SchoolEnum, String> schools;
    private Map<AddressEnum, String> addresses;
    private Map<PolicyEnum, String> policies;
    private Boolean isOnline;
}
