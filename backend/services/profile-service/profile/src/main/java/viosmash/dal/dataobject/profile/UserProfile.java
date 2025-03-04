package viosmash.dal.dataobject.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;

@Entity
@Table(name = "profile_user")
@Accessors(chain = true)
@Data
public class UserProfile {
    @Id
    private Long userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private SexEnum sexEnum;
    private Date dateOfBirth;
    private Date createdDate;

}
