package viosmash.collection;

import org.springframework.util.CollectionUtils;
import viosmash.pojo.KeyValue;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class MapUtils {


    public static <K, V> Map<K, V> convert(Collection<KeyValue<K, V>> coll) {
        Map<K, V> map = new HashMap<>();
        if(CollectionUtils.isEmpty(coll)) return map;
        for(KeyValue<K, V> x : coll) {
            map.put(x.getKey(), x.getValue());
        }
        return map;
    }
    public static <K, V,T> Map<K, V> convert(Map<T, V> xl, Function<T, K> func) {
        Map<K, V> map = new HashMap<>();
        if(CollectionUtils.isEmpty(xl)) return map;
        for(var x : xl.entrySet()) {
            map.put(func.apply(x.getKey()), x.getValue());
        }
        return map;
    }
}
