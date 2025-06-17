package viosmash.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.vo.UserCreateReqVO;
import viosmash.controller.vo.UserUpdateInfoReqVO;
import viosmash.dal.dataobject.User;
import viosmash.dal.repository.UserRepository;
import viosmash.exception.ServiceException;
import viosmash.random.RandomUtils;

import static org.junit.jupiter.api.Assertions.assertThrows;

@Slf4j
class UserServiceTest extends BaseTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @org.junit.jupiter.api.Test
    void createUserThenThrowUserExistsException() {
        userRepository.save(new User().setEmail("hello world"));
        UserCreateReqVO req = RandomUtils.randomObject(UserCreateReqVO.class, (r) -> {
           r.setPassword("2222222222222222222");
           r.setEmail("hello worLd");
        });

        ServiceException serviceException = assertThrows(ServiceException.class, () -> {
            userService.createUser(req);
        });
        log.info("info exception: {}", serviceException);
        Assertions.assertNotNull(serviceException);
    }

    @org.junit.jupiter.api.Test
    void createUserThenReturnSuccess() {
        UserCreateReqVO req = RandomUtils.randomObject(UserCreateReqVO.class, (r) -> {
            r.setPassword("2222222222222222222");
            r.setEmail("hello worLd");
        });
        Assertions.assertDoesNotThrow(() -> {
            userService.createUser(req);
        });
    }


    @org.junit.jupiter.api.Test
    void updateInfo() {
        UserUpdateInfoReqVO infoReq = new UserUpdateInfoReqVO();
        infoReq.setIsMale(false);
        infoReq.setBio("hleheh");

        User user = RandomUtils.randomObject(User.class, u -> {
            u.setId(null);
        });

        userRepository.save(user);

        userService.updateInfo(user.getId(), infoReq);

        user = userService.getUserById(user.getId());

        Assertions.assertEquals(user.getIsMale(), infoReq.getIsMale());
        Assertions.assertEquals(user.getBio(), infoReq.getBio());

        log.info("info user after update: {}", user);
    }

}