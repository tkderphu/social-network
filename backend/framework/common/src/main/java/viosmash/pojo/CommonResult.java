package viosmash.pojo;

import lombok.Data;
import viosmash.exception.ErrorCode;

import java.util.function.Function;

@Data
public class CommonResult <T>{

    private String message;
    private Integer code;
    private T data;

    public CommonResult(String message, Integer code, T data) {
        this.message = message;
        this.code = code;
        this.data = data;
    }

    public static <T> CommonResult<T> success(String message, Integer code, T data) {
        return new CommonResult<>(message, code, data);
    }
    public static <T, U> CommonResult<T> success(U data, Function<U, T> func) {
        return success(func.apply(data));
    }
    public static <T> CommonResult<T> success(String message, T data) {
        return success(message, 200, data);
    }
    public static <T> CommonResult<T> success(T data) {
        return success("", 200, data);
    }
    public static <T> CommonResult<T> success(Integer code, T data) {
        return success("", code, data);
    }

    public static <T> CommonResult<T> error(String message, Integer code) {
        return new CommonResult<>(message, code, null);
    }
    public static <T> CommonResult<T> error(ErrorCode errorCode) {
        return error(errorCode.getMessage(), errorCode.getCode());
    }
}
