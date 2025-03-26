package viosmash.dal.dataobject.profile;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;

@Entity
@Table(name = "profile_user")
@Accessors(chain = true)
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private SexEnum sexEnum;
    private Date dateOfBirth;
    private Date createdDate;

}
