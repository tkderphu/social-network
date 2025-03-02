package viosmash.dal.repository.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.token.AuthRefreshToken;

import java.util.Optional;

public interface AuthRefreshTokenRepository extends JpaRepository<AuthRefreshToken, Long> {
    Optional<AuthRefreshToken> findByRefreshToken(String refreshToken);

    @Modifying
    void deleteByRefreshToken(String refreshToken);
}
