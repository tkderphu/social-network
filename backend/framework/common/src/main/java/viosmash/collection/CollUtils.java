package viosmash.collection;

import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.function.Function;

public class CollUtils {
    public static <T, U> List<T> convertList(Collection<U> collection, Function<U, T> func) {
        if(CollectionUtils.isEmpty(collection)) {
            return Collections.emptyList();
        }
        return collection.stream().map(func).toList();
    }

    public static <T> List<T> convertList(T[] t) {
        List<T> list = new ArrayList<>();
        for(T x : t) {
            list.add(x);
        }
        return list;
    }
    public static <T>Set<T> convertSet() {
        return null;
    }

}
