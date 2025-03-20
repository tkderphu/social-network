package viosmash.object;

import lombok.SneakyThrows;

import java.lang.reflect.Constructor;

public class ObjectUtils {

    @SneakyThrows
    public static <T> T getObject(Class<T> clazz) {
        Constructor<T> constructor= clazz.getConstructor();
        return constructor.newInstance();
    }
    public static boolean isNull(Object o) {
        return o == null;
    }
}
