package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import viosmash.dal.repository.profile.UserProfileRepository;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProfileApiImpl implements ProfileApi{

    private final UserProfileRepository userProfileRepository;

    @Override
    public List<UserDTO> getAllUsers(Collection<Long> ids) {
        return null;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        return null;
    }
}
