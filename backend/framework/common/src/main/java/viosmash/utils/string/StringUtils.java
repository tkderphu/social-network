package viosmash.utils.string;

public class StringUtils {


    public static String lower(String str) {
        return str.trim().toLowerCase();
    }
    public static boolean isEmpty(String str) {
        return str == null || str.isBlank();
    }
}
