package viosmash.controller.profile.vo;

import lombok.Data;
import viosmash.dal.dataobject.profile.AddressEnum;
import viosmash.dal.dataobject.profile.EducationEnum;
import viosmash.dal.dataobject.profile.SexEnum;
import viosmash.pojo.KeyValue;

import java.util.Date;

@Data
public class UserProfileUpdateReqVO {
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String phoneNumber;
    private SexEnum sexEnum;

    private KeyValue<EducationEnum, KeyValue<Long, String>> education;
    private KeyValue<AddressEnum, KeyValue<Long, String>> address;

}
