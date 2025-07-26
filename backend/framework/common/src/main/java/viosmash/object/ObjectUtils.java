package viosmash.object;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;

public class ObjectUtils {

    public static <T> T getObject(Class<T> clazz) {
        try {
            Constructor<T> constructor= clazz.getConstructor();
            return constructor.newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public static <T>  T isNullAble(T nullableObj, T t) {
        boolean checkNull = isNull(nullableObj);
        if(checkNull) return t;
        return nullableObj;
    }
    public static boolean isNull(Object o) {
        return o == null;
    }

    public static Field[] getFields(Class<?> clazz) {
        return clazz.getDeclaredFields();
    }

}
