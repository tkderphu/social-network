package viosmash.exception;

import lombok.extern.slf4j.Slf4j;

import java.util.function.Function;
@Slf4j
public class Exceptional  {
    public static <T, U> U process(T applied, Function<T, U> func) {
        try {
            return func.apply(applied);
        } catch (Exception ex) {
            log.warn("exceptional[process({ex})]", ex);
            return null;
        }
    }

    public static <T, U> U process(T applied, Function<T, U> func, U defaultValue) {
        try {
            return func.apply(applied);
        } catch (Exception ex) {
            log.warn("exceptional[process({ex})]", ex);
            return defaultValue;
        }
    }
}
