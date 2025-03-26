package viosmash.controller.profile.vo;

import lombok.Data;
import viosmash.dal.dataobject.profile.AddressEnum;
import viosmash.dal.dataobject.profile.EducationEnum;
import viosmash.dal.dataobject.profile.SexEnum;

import java.util.Date;
import java.util.List;

@Data
public class UserProfileRespVO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private SexEnum sexEnum;
    private Date dateOfBirth;
    private Date createdDate;

    private List<EducationResp> educations;
    private List<AddressResp> addresses;

    @Data
    public static class EducationResp {
        private EducationEnum educationEnum;
        private Long pageId;
        private String pageName;
    }
    @Data
    public static class AddressResp {
        private AddressEnum addressEnum;
        private Long pageId;
        private String pageName;
    }

}
