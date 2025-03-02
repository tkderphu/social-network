package viosmash.dal.repository.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.token.AuthAccessToken;

import java.util.List;
import java.util.Optional;

public interface AuthAccessTokenRepository extends JpaRepository<AuthAccessToken, Long> {


    Optional<AuthAccessToken> findByAccessToken(String accessToken);

    @Modifying
    void deleteAllByRefreshToken(String refreshToken);
}
