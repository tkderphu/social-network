package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.SchoolEnum;
import viosmash.converter.JsonMapConverter;

import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "tblUser")
@Accessors(chain = true)
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Boolean isMale;
    private String bio;
    private Date dateOfBirth;
    private Date createdDate;

    @Convert(converter = JsonMapConverter.class)
    private Map<SchoolEnum, String> schools;

    @Convert(converter = JsonMapConverter.class)
    private Map<AddressEnum, String> addresses;

    @Convert(converter = JsonMapConverter.class)
    private Map<PolicyEnum, String> policies;

    @Column(unique = true)
    private String email;
    private String password;

    private Boolean isOnline;
    private String avatar;

    public String getAvatar() {
        if(this.avatar == null) {
            return "https://icons.veryicon.com/png/o/miscellaneous/commonly-used-icon-1/personal-25.png";
        }
        return avatar;
    }
}
