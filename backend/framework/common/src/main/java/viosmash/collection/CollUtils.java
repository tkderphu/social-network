package viosmash.collection;

import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;

public class CollUtils {

    public static <T, U> List<T> convertList(Collection<U> collection, Function<U, T> func) {
        if(CollectionUtils.isEmpty(collection)) {
            return Collections.emptyList();
        }
        return collection.stream().map(func).toList();
    }

    public static <T, U> List<T> convertList(Collection<U> collection,
                                             Function<U, T> func,
                                             Comparator<T> comparator,
                                             int skip,
                                             int limit) {
        if(CollectionUtils.isEmpty(collection)) {
            return Collections.emptyList();
        }
        return collection.stream().map(func)
                .sorted(comparator)
                .skip(skip)
                .limit(limit)
                .toList();
    }

    public static <T, U> List<T> convertList(Collection<U> collection,
                                             Function<U, T> func,
                                             Comparator<T> comparator) {
        if(CollectionUtils.isEmpty(collection)) {
            return Collections.emptyList();
        }
        return collection.stream().map(func)
                .sorted(comparator)
                .toList();
    }

    public static <T, U> List<T> convertList(Collection<U> collection,
                                             Function<U, T> func,
                                             Predicate<T> filter) {
        if(CollectionUtils.isEmpty(collection)) {
            return Collections.emptyList();
        }
        return collection.stream().map(func).filter(filter).toList();
    }



    public static <T, U> List<T> convertList(Collection<U> collection,
                                             Function<U, T> func,
                                             Predicate<U> filterBeforeMap,
                                             Predicate<T> filterAfterMap) {
        if(CollectionUtils.isEmpty(collection)) {
            return Collections.emptyList();
        }
        return collection.stream().filter(filterBeforeMap).map(func).filter(filterAfterMap).toList();
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
