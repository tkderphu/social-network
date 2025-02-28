package viosmash.service.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import viosmash.EventConstant;
import viosmash.controller.auth.vo.AuthLoginReqVO;
import viosmash.controller.auth.vo.AuthLoginRespVO;
import viosmash.controller.auth.vo.AuthRegisterReqVO;
import viosmash.converter.AuthConverter;
import viosmash.dal.dataobject.auth.User;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.dal.repository.auth.UserRepository;
import viosmash.event.auth.UserCreated;
import viosmash.service.token.AuthTokenService;
import viosmash.utils.json.JsonUtils;
import viosmash.utils.object.BeanUtil;
import viosmash.utils.string.StringUtils;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
@Validated
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RabbitTemplate rabbitTemplate;
    private final AuthTokenService authTokenService;
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
    public void logout(String accessToken) {

    }

    @Override
    public AuthLoginRespVO refreshToken(String refreshToken) {
        AuthAccessToken authAccessToken = authTokenService.refreshAccessToken(refreshToken);
        return AuthConverter.INSTANCE.convert(authAccessToken);
    }

    @Override
    public void register(@Valid AuthRegisterReqVO registerReqVO) {
        boolean isExistsUser = this.userRepository.findByEmail(registerReqVO.getEmail())
                .isPresent();
        if(isExistsUser) {
            throw exception(400, "User exists");
        }
        User user = new User().setEmail(registerReqVO.getEmail())
                .setPassword(passwordEncoder.encode(registerReqVO.getPassword()));

        this.userRepository.save(user);

        UserCreated userCreated = BeanUtil.copy(registerReqVO, UserCreated.class);
        assert userCreated != null;

        rabbitTemplate.convertAndSend(
                String.format(EventConstant.USER_CREATED, "dir"),
                String.format(EventConstant.USER_CREATED, "rou"),
                JsonUtils.toStringJson(userCreated)
        );

    }
}
