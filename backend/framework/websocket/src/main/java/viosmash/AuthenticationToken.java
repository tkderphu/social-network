package viosmash;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import viosmash.core.utils.LoginUser;

import java.util.Collection;

public class AuthenticationToken extends AbstractAuthenticationToken {
    private LoginUser principle;

    public AuthenticationToken(Collection<? extends GrantedAuthority> authorities,
                               LoginUser principle) {
        super(authorities);
        this.principle = principle;
    }

    @Override
    public Object getCredentials() {
        return this.principle.getAccessToken();
    }

    @Override
    public Object getPrincipal() {
        return this.principle.getUserId();
    }


}