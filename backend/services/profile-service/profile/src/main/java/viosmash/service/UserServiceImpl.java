package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.BlockedUserStatusResp;
import viosmash.controller.vo.UserCreateReqVO;
import viosmash.controller.vo.UserRespVO;
import viosmash.controller.vo.UserUpdateInfoReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.BlockedUser;
import viosmash.dal.dataobject.User;
import viosmash.dal.redis.ForgotCodeRedis;
import viosmash.dal.repository.BlockedUserRepository;
import viosmash.dal.repository.UserRepository;
import viosmash.date.DateUtils;
import viosmash.exception.Exceptional;
import viosmash.friendship.api.FriendshipApi;
import viosmash.object.BeanUtil;
import viosmash.object.ObjectUtils;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.pojo.api.notification.NotificationType;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.EducationEnum;
import viosmash.random.RandomUtils;
import viosmash.string.StringUtils;

import java.util.*;

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
    private final BlockedUserRepository blockedUserRepository;
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

        if(req.getIsMale() != null) user.setIsMale(req.getIsMale());

        if(!ObjectUtils.isNullAble(req.getFirstName(), "").isEmpty()) user.setFirstName(req.getFirstName());

        if(!ObjectUtils.isNullAble(req.getLastName(), "").isEmpty()) user.setLastName(req.getLastName());

        if(!ObjectUtils.isNullAble(req.getBio(), "").isEmpty()) user.setBio(req.getBio());

        if(!ObjectUtils.isNullAble(req.getPhoneNumber(), "").isEmpty()) user.setPhoneNumber(req.getPhoneNumber());

        if(ObjectUtils.isNullAble(req.getDateOfBirth(), null) != null) user.setDateOfBirth(req.getDateOfBirth());


        this.userRepository.save(user);
    }

    @Override
    public void updatePolicy(Long userId, Map<String, String> req) {
        this.userRepository.save(getUserById(userId).setPolicies(req));
    }

    @Override
    public void updateAddress(Long userId, Map<String, String> req) {
        this.userRepository.save(getUserById(userId).setAddresses(req));
    }

    @Override
    public void updateSchool(Long userId, Map<String, String> req) {
        this.userRepository.save(getUserById(userId).setEducations(req));
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
        return BeanUtil.copy(user, UserRespVO.class);
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

    @Override
    public List<UserRespVO> searchUser(String name) {
        Long currentId = SecurityUtils.getLoginUserMemberId();
        List<User> users = userRepository.searchByName(name);
        List<Long> friends = Exceptional.process(currentId, (userId) -> {
            return friendshipApi.getListFriends(userId);
        }, Collections.emptyList());

        //current user interact other user will be top list
        List<Object[]> objects = CollUtils.convertList(users, user -> {
            Set<Long> recommendations = Exceptional.process(user.getId(), userId -> {
                return friendshipApi.getListCommonFriends(user.getId(), currentId);
            }, Collections.emptySet());
            Object[] objs = new Object[2];
            objs[0] = user;
            objs[1] = friends.contains(user.getId()) ? 10 : (CollectionUtils.isEmpty(recommendations) ? 0 : 5);
            return objs;
        }, (user1, user2) -> (int) user2[1] - (int) user1[1]);

        return CollUtils.convertList(objects, obj -> BeanUtil.copy(obj[0], UserRespVO.class));
    }

    @Override
    public void updateBlockUser(Long fromUserId, Long toUserId, Boolean typeBlock) {
        BlockedUser blockedUser = this.blockedUserRepository.findByFromUserIdAndToUserId(
                fromUserId, toUserId
        );

        if(blockedUser == null) {
            if(typeBlock) {
                blockedUser = new BlockedUser()
                        .setFromUserId(fromUserId)
                        .setToUserId(toUserId);
                this.blockedUserRepository.save(blockedUser);

                log.info("blocked ok");

            } else {
                throw exception(500, "you haven't blocked this user yet.");
            }
        } else {
            if(typeBlock) {
                throw exception(500, "you have blocked this user.");
            } else {
                this.blockedUserRepository.delete(blockedUser);

                log.info("unblocked ok");
            }
        }
    }

    @Override
    public List<UserRespVO> getListBlockedUser(Long fromUserId) {
        return CollUtils.convertList(
                this.blockedUserRepository.findAllByFromUserId(fromUserId),
                blockedUser -> BeanUtil.copy(userRepository.findById(blockedUser.getToUserId()), UserRespVO.class)
        );
    }

    @Override
    public BlockedUserStatusResp checkBlocked(Long currentUserId, Long userId) {
        BlockedUser blockedUser = this.blockedUserRepository.findByFromUserIdAndToUserId(currentUserId, userId);

        if(blockedUser != null) {
            return new BlockedUserStatusResp(true, BlockedUserStatusResp.Direction.FROM);
        }

        blockedUser = this.blockedUserRepository.findByFromUserIdAndToUserId(userId, currentUserId);

        if(blockedUser != null) {
            return new BlockedUserStatusResp(true, BlockedUserStatusResp.Direction.TO);
        }
        return new BlockedUserStatusResp(false, null);
    }

    @Override
    public List<User> searchUser(String keyword, Set<Long> userIds) {
        return this.userRepository.searchByName(keyword, userIds);
    }

}
