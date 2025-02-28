package viosmash.dal.repository.token;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.token.AuthAccessToken;

import java.util.List;
import java.util.Optional;

public interface AuthAccessTokenRepository extends JpaRepository<AuthAccessToken, Long> {
    List<AuthAccessToken> findAllByRefreshToken(String refreshToken);
}
