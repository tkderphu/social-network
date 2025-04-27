package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.dal.dataobject.profile.UserProfile;
import viosmash.dal.repository.profile.UserProfileRepository;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(ProfileApi.PREFIX)
public class ProfileApiImpl implements ProfileApi{

    private final UserProfileRepository userProfileRepository;

    @Override
    public List<UserDTO> getAllUsers(Collection<Long> ids) {
        return null;
    }

    @Override
    @GetMapping("/{userId}")
    public UserDTO getUserById(@PathVariable("userId") Long userId) {
        UserProfile userProfile = userProfileRepository.findById(userId).get();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userProfile.getUserId());
        userDTO.setFirstName(userProfile.getFirstName());
        userDTO.setLastName(userProfile.getLastName());
//        userDTO.setImageUrl(userProfile.get);
        return userDTO;
    }
}
