package viosmash.object;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.function.Consumer;
@Slf4j
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



    public static <T> void setTargetIfNotNull(T target, T something) {
        Field[] fields = ObjectUtils.getFields(something.getClass());
        for(Field field : fields) {
            field.setAccessible(true);
           try {
               Object value = field.get(something);
               if(value != null) {
                   field.set(target, value);
               }
           } catch (Exception e) {
               log.error("[setTargetIfNotNull]target({})something({})error({})", target, something, e);
               throw new RuntimeException(e);
           }
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
