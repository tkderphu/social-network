package viosmash.exception.utils;

import viosmash.exception.ErrorCode;
import viosmash.exception.ServiceException;

public class ServiceUtils {
    public static ServiceException exception(ErrorCode errorCode) {
        return new ServiceException(errorCode);
    }

    public static ServiceException exception(Integer code, String message) {
        return new ServiceException(code, message);
    }
}
