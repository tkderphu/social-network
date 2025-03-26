package viosmash.random;

import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;

import java.util.List;
import java.util.function.Consumer;

public class RandomUtils {
    private static EasyRandom easyRandom = null;
    static  {
        easyRandom = new EasyRandom();
        EasyRandomParameters parameters = new EasyRandomParameters();
        parameters.setStringLengthRange(new EasyRandomParameters.Range<>(6, 6));
        parameters.setCollectionSizeRange(new EasyRandomParameters.Range<>(5, 5));
    }
    public static <T> T randomObject(Class<T> clazz) {
        return easyRandom.nextObject(clazz);
    }
    public static <T> T randomObject(Class<T> clazz, Consumer<T> consumer) {
        T t = randomObject(clazz);
        consumer.accept(t);
        return t;
    }
    public static <T>List<T> randomList(Class<T> clazz) {
        return easyRandom.objects(clazz, 6).toList();
    }
    public static <T> List<T> randomList(Class<T> clazz, Consumer<T> consumer) {
        var list = randomList(clazz);
        list.stream().forEach(r -> {
            consumer.accept(r);
        });
        return list;
    }
}
