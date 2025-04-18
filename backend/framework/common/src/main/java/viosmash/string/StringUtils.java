package viosmash.string;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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


    public static List<String> extractPlaceholders(String input, Pattern pattern) {
        List<String> result = new ArrayList<>();
        Matcher matcher = pattern.matcher(input);
        while (matcher.find()) {
            result.add(matcher.group(1));
        }
        return result;
    }

}
