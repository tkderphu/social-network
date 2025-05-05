package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.date.DateUtils;
import viosmash.friendship.api.UserApi;
import viosmash.friendship.api.UserDTO;
import viosmash.object.BeanUtil;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.SchoolEnum;
import viosmash.controller.post.vo.UserCreateReqVO;
import viosmash.controller.post.vo.UserRespVO;
import viosmash.controller.post.vo.UserUpdateInfoReqVO;
import viosmash.dal.dataobject.User;
import viosmash.dal.repository.UserRepository;

import java.util.Date;
import java.util.Map;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserApi friendshipApi;
    private final viosmash.chat.api.UserApi chatUserApi;

    @Override
    @Transactional
    public void createUser(UserCreateReqVO req) {
        log.info("Create new user[createUser({})]", req);
        boolean emailExists = userRepository.findByEmailIgnoreCase(req.getEmail())
                .isPresent();
        if(emailExists) {
            throw exception(500, "Email registered before");
        }
        User user = BeanUtil.copy(req, User.class)
                .setPassword(encoder.encode(req.getPassword()))
                .setCreatedDate(new Date())
                .setIsOnline(false);
        userRepository.save(user);
        friendshipApi.updateUser(BeanUtil.copy(user, UserDTO.class));
        chatUserApi.updateUserInfo(BeanUtil.copy(user, viosmash.chat.api.UserDTO.class));
    }

    @Override
    public void updateInfo(Long userId, UserUpdateInfoReqVO req) {
        User user = getUserById(userId);
        BeanUtil.setTargetIfNotNull(user, BeanUtil.copy(req, User.class));

        this.userRepository.save(user);
    }

    @Override
    public void updatePolicy(Long userId, Map<PolicyEnum, String> req) {
        this.userRepository.save(getUserById(userId).setPolicies(req));
    }

    @Override
    public void updateAddress(Long userId, Map<AddressEnum, String> req) {
        this.userRepository.save(getUserById(userId).setAddresses(req));
    }

    @Override
    public void updateSchool(Long userId, Map<SchoolEnum, String> req) {
        this.userRepository.save(getUserById(userId).setSchools(req));
    }

    @Override
    public void updateAvatar(Long userId, String avatar) {
        this.userRepository.save(getUserById(userId).setAvatar(avatar));
    }


    @Override
    public void updateUserStatus(Long userId, Boolean isOnline) {
        this.userRepository.save(getUserById(userId).setIsOnline(isOnline));
    }

    @Override
    public UserRespVO getProfile(Long userId) {
        User user = getUserById(userId);
        return BeanUtil.copy(user, UserRespVO.class)
                .setDob(DateUtils.format(user.getDateOfBirth()))
                .setGender(user.getIsMale() ? "Male" : "Female")
                .setJoined(DateUtils.format(user.getCreatedDate()));
    }

    @Override
    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> exception(404, "not found user with id: " + userId));
    }

    @Override
    public User checkUser(String email, String password) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> exception(404, "email invalid"));
        if(encoder.matches(password, user.getPassword())) {
            return user;
        }
        throw exception(404, "password invalid");
    }

}
