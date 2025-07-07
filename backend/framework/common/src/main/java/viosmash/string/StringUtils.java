package viosmash.string;

import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class StringUtils {


    public static String lower(String str) {
        return str.trim().toLowerCase();
    }
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty() || str.isBlank();
    }


    public static String formatPlaceHolders(String content, Map<String, Object> map) {
        for(Map.Entry<String, Object> entry : map.entrySet()) {
            content = content.replace("{{" + entry.getKey() + "}}", entry.getValue().toString());
        }
        return content;
    }

    public static <T, U extends String> String concat(Collection<T> coll, String delimiter, Function<T, U> func) {
        if(CollectionUtils.isEmpty(coll)) return "";
        List<String> t = new ArrayList<>();
        for(T x : coll) {
            U apply = func.apply(x);
            if(apply != null) {
                t.add(apply);
            }
        }
        return t.stream().collect(Collectors.joining(", "));

    }

    public static boolean equal(String s1, String s2) {
        return (s1.trim().toLowerCase()).equals(s2.trim().toLowerCase());
    }


    public static List<String> extractPlaceholders(String input, Pattern pattern) {
        List<String> result = new ArrayList<>();
        Matcher matcher = pattern.matcher(input);
        while (matcher.find()) {
            result.add(matcher.group(1));
        }
        return result;
    }

}
