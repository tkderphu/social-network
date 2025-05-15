package viosmash.collection;

import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class StreamUtils {
    public static <U> boolean anyMatch(Collection<U> coll, Predicate<U> predicate) {
        if(CollectionUtils.isEmpty(coll)) return false;
        return coll.stream().anyMatch(predicate);
    }

    public static<U> Stream<U> filterAndThen(Collection<U> coll, Predicate<U> predicate) {
        if(CollectionUtils.isEmpty(coll)) return Stream.empty();
        return coll.stream().filter(predicate);
    }
}
