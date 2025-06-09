package viosmash.collection;

import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.ToIntFunction;
import java.util.stream.IntStream;
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

    public static <U> IntStream mapToInt(Collection<U> collection, ToIntFunction<U> fc) {
        if(CollectionUtils.isEmpty(collection)) return IntStream.of(0);
        return collection.stream().mapToInt(fc);
    }
}
