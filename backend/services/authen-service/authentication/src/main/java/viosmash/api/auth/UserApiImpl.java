package viosmash.api.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.dal.repository.auth.UserRepository;

@RestController
@RequestMapping(UserApi.PREFIX)
@RequiredArgsConstructor
@Slf4j
public class UserApiImpl implements UserApi{
    private final UserRepository userRepository;
    @Override
    @PutMapping
    @Transactional
    public void updateOnlineStatus(@RequestBody UserUpdatedStatus updatedStatus) {
        userRepository.updateUserStatus(updatedStatus.getUserId(), updatedStatus.getOnline());
        log.info("updated successfully status user");
    }
}
