package viosmash.object;

import lombok.SneakyThrows;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.List;

public class ObjectUtils {

    public static <T> T getObject(Class<T> clazz) {
        try {
            Constructor<T> constructor= clazz.getConstructor();
            return constructor.newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public static boolean isNull(Object o) {
        return o == null;
    }

    public static Field[] getFields(Class<?> clazz) {
        return clazz.getDeclaredFields();
    }

}
