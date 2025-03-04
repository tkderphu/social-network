package viosmash.utils.date;

import java.time.temporal.ChronoUnit;

public class DateUtils {

    public static Long getCurrentMilliseconds() {
        return System.currentTimeMillis();
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
