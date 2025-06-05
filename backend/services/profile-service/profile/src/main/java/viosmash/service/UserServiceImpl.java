package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.dal.redis.ForgotCodeRedis;
import viosmash.date.DateUtils;
import viosmash.friendship.api.FriendshipApi;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.pojo.api.notification.NotificationType;
import viosmash.object.BeanUtil;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.SchoolEnum;
import viosmash.controller.post.vo.UserCreateReqVO;
import viosmash.controller.post.vo.UserRespVO;
import viosmash.controller.post.vo.UserUpdateInfoReqVO;
import viosmash.dal.dataobject.User;
import viosmash.dal.repository.UserRepository;
import viosmash.random.RandomUtils;
import viosmash.string.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final FriendshipApi friendshipApi;
    private final ForgotCodeRedis forgotCodeRedis;
    private final ApplicationContext applicationContext;
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
//        friendshipApi.updateUser(BeanUtil.copy(user, UserDTO.class));
//        chatUserApi.updateUserInfo(BeanUtil.copy(user, viosmash.chat.api.UserDTO.class));
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

    @Override
    public String forgotPassword(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> exception(404, "email invalid"));

        String forgotCode = RandomUtils.randomObject(String.class);
        forgotCodeRedis.set(forgotCode, StringUtils.lower(email));

        //notification
        Map<String, Object> map = new HashMap<>();
        map.put("fullName", user.getFirstName() + " " + user.getLastName());
        map.put("joined", DateUtils.format(user.getCreatedDate()));
        map.put("forgotCode", forgotCode);
        map.put("email", StringUtils.lower(email));
        map.put("expires", forgotCodeRedis.getTimeToLive());

        NotificationDto dto = new NotificationDto();
        dto.setType(NotificationType.FORGOT_PASSWORD);


        applicationContext.publishEvent(dto);
        log.info("forgot password code sent to user");
        return String.format("We have sent to your email with code for initial password, please enter it here.");
    }

    @Override
    public void updateNewPassword(String email, String newPassword) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> exception(404, "email invalid"));

        user.setPassword(encoder.encode(newPassword));

        this.userRepository.save(user);
    }

    @Override
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = getUserById(userId);
        if(!encoder.matches(oldPassword, user.getPassword())) {
            throw exception(404, "Password not match");
        }
        user.setPassword(encoder.encode(newPassword));
    }

}
