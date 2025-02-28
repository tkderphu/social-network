package viosmash.pojo;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class KeyValue <K, V>{
    private K key;
    private V value;
}
