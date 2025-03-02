package viosmash.constant;

import viosmash.exception.ErrorCode;

public interface ErrorCodeConstant {
    ErrorCode REFRESH_TOKEN_INVALID = new ErrorCode(401, "Refresh token is invalid");
}
