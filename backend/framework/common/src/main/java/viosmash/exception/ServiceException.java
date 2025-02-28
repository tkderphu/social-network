package viosmash.exception;

import lombok.Data;

@Data
public class ServiceException extends RuntimeException {
    private Integer code;
    private String message;

    public ServiceException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }

    public ServiceException(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
