package viosmash.object;

import org.springframework.beans.BeanUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.function.Consumer;

public class BeanUtil {

    public static <T> T copy(Object source, Class<T> targetClass) {
        try {
            Constructor<T> constructor = targetClass.getConstructor();
            T targetObject = constructor.newInstance();
            BeanUtils.copyProperties(source, targetObject);
            return targetObject;
        } catch (Exception e) {
            return null;
        }
    }

    public static <T> T copy(Object source, Class<T> targetClass, Consumer<T> consumer) {
        T target = copy(source, targetClass);
        if(target != null) {
            consumer.accept(target);
        }
        return target;
    }

}
