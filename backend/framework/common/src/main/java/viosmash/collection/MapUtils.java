package viosmash.collection;

import org.springframework.util.CollectionUtils;
import viosmash.pojo.KeyValue;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class MapUtils {


    public static <K, V> Map<K, V> convert(Collection<KeyValue<K, V>> coll) {
        Map<K, V> map = new HashMap<>();
        if(CollectionUtils.isEmpty(coll)) return map;
        for(KeyValue<K, V> x : coll) {
            map.put(x.getKey(), x.getValue());
        }
        return map;
    }
}
