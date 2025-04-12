package viosmash.date;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class DateUtils {

    public static final String PATTERN_1 = "dd/MM/yyyy";
    public  static final  String PATTERN_2 = "dd/MM/yyyy hh:MM:ss";
    public static Long getCurrentMilliseconds() {
        return System.currentTimeMillis();
    }

    public static String format(Date date) {
        return null;
    }
    public static String formatFull(Date date) {
        return null;
    }
    public static String format(LocalDateTime localDateTime) {
         return null;
    }

    public static Long between(Long milliseconds, ChronoUnit chronoUnit) {
        long between = milliseconds - getCurrentMilliseconds();
        switch (chronoUnit) {
            case SECONDS -> {
                return between/1000;
            }
            case MINUTES -> {
                return between/(1000 * 60);
            }
            case HOURS -> {
                return between/(1000 * 60 * 60);
            }
            default -> {
                throw new  UnsupportedOperationException("Not support exclusive SECONDS, MINUTES, HOURS");
            }
        }
    }




    public static boolean before(Long expires) {
        Long current =  getCurrentMilliseconds();
        return current < expires;
    }

}
