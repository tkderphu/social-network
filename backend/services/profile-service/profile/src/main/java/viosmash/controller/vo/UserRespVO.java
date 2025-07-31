package viosmash.controller.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.EducationEnum;

import java.util.Date;
import java.util.Map;

@Data
@Accessors(chain = true)
public class UserRespVO {
    private String avatar;
    private String coverPhoto;
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String gender;
    private String bio;
    private Date dateOfBirth;
    private Date createdDate;
    private Map<String, String> educations;
    private Map<String, String> addresses;
    private Map<String, String> policies;
    private Boolean isOnline;
}
