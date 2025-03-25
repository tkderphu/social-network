package viosmash.service.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import viosmash.EventConstant;
import viosmash.controller.auth.vo.*;
import viosmash.converter.AuthConverter;
import viosmash.dal.dataobject.auth.User;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.dal.redis.AuthRedisRepository;
import viosmash.dal.repository.auth.UserRepository;
import viosmash.event.auth.UserCreated;
import viosmash.event.notify.forgotpassword.ForgotPasswordEvent;
import viosmash.service.token.AuthTokenService;
import viosmash.json.JsonUtils;
import viosmash.object.BeanUtil;
import viosmash.string.StringUtils;

import java.util.UUID;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RabbitTemplate rabbitTemplate;
    private final AuthTokenService authTokenService;
    private final AuthRedisRepository authRedisRepository;

    @Value("${spring.authentication.forgotPassword.codeExpiredMinutes}")
    private Integer forgotPasswordExpires;

    @Override
    public AuthLoginRespVO login(@Valid AuthLoginReqVO loginReqVO) {
        User user = userRepository.findByEmail(StringUtils.lower(loginReqVO.getEmail()))
                .orElseThrow(() -> exception(404, "Your email is invalid"));

        if(!passwordEncoder.matches(loginReqVO.getPassword(), user.getPassword())) {
            throw exception(404, "Your password is invalid");
        }
        AuthAccessToken authAccessToken = authTokenService.createAccessToken(user);
        return AuthConverter.INSTANCE.convert(authAccessToken);
    }


    @Override
    @Transactional
    public void logout(String accessToken, String refreshToken) {
        this.authTokenService.removeAccessToken(accessToken, refreshToken);
        this.authTokenService.removeRefreshToken(refreshToken);
    }

    @Override
    public AuthLoginRespVO refreshToken(String refreshToken) {
        AuthAccessToken authAccessToken = authTokenService.refreshAccessToken(refreshToken);
        return AuthConverter.INSTANCE.convert(authAccessToken);
    }

    @Override
    public void register(@Valid AuthRegisterReqVO registerReqVO) {
        boolean isExistsUser = this.userRepository.findByEmail(registerReqVO.getEmail().toLowerCase())
                .isPresent();
        if(isExistsUser) {
            throw exception(400, "User exists");
        }
        User user = new User().setEmail(registerReqVO.getEmail().toLowerCase())
                .setPassword(passwordEncoder.encode(registerReqVO.getPassword()));

        this.userRepository.save(user);

        UserCreated userCreated = BeanUtil.copy(registerReqVO, UserCreated.class);
        assert userCreated != null;

//        rabbitTemplate.convertAndSend(
//                String.format(EventConstant.USER_CREATED, "dir"),
//                String.format(EventConstant.USER_CREATED, "rou"),
//                JsonUtils.toStringJson(userCreated)
//        );

    }

    @Override
    public void forgotPassword(String email) {
        User user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> exception(404, "Your email not found"));
        String code = UUID.randomUUID().toString();
        ForgotPasswordEvent event = new ForgotPasswordEvent(
                user.getEmail(),
                code
        );

        authRedisRepository.setForgetCode(event, forgotPasswordExpires);

        rabbitTemplate.convertAndSend(
                String.format(EventConstant.FORGOT_PASSWORD, "dir"),
                String.format(EventConstant.FORGOT_PASSWORD, "rou"),
                JsonUtils.toStringJson(event)
        );
    }

    @Override
    public ForgotPasswordEvent forgotPasswordVerifyCode(String code) {
        ForgotPasswordEvent event = this.authRedisRepository.getForgotPasswordEvent(code);
        if(event == null) {
            throw  exception(404, "Your code forgot password not found");
        }
        return event;
    }

    @Override
    public void changePassword(Long userId, AuthChangePasswordReqVO changePasswordReqVO) {
        User user = this.userRepository.findById(userId).get();
        if(!passwordEncoder.matches(user.getPassword(), changePasswordReqVO.getOldPassword())) {
            throw exception(404, "Your old password not match");
        }
        user.setPassword(passwordEncoder.encode(changePasswordReqVO.getNewPassword()));
        this.userRepository.save(user);
    }

    @Override
    public void initPassword(AuthInitPasswordReqVO initPasswordReqVO) {
        ForgotPasswordEvent forgotPasswordEvent = forgotPasswordVerifyCode(initPasswordReqVO.getCode());
        User user = this.userRepository.findByEmail(forgotPasswordEvent.getEmail())
                .orElse(null);
        if(user != null) {
            user.setPassword(passwordEncoder.encode(initPasswordReqVO.getNewPassword()));
            this.userRepository.save(user);
        }
    }
}
