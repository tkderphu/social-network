package viosmash.converter;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.controller.auth.vo.AuthLoginRespVO;
import viosmash.dal.dataobject.token.AuthAccessToken;

@Mapper
public interface AuthConverter {
    AuthConverter INSTANCE = Mappers.getMapper(AuthConverter.class);

    AuthLoginRespVO convert(AuthAccessToken authAccessToken);
}
