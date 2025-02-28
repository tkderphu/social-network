package viosmash.dal.repository.token;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.token.AuthRefreshToken;

import java.util.Optional;

public interface AuthRefreshTokenRepository extends JpaRepository<AuthRefreshToken, Long> {
    Optional<AuthRefreshToken> findByRefreshToken(String refreshToken);
}
