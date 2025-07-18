package viosmash.post.enums;

import lombok.Getter;

public enum ReportType {
    SPAM_UNWANTED_CONTENT("Spam or unwanted content"),
    HARASSMENT_BULLYING("Harassment or bullying"),
    INAPPROPRIATE_CONTENT("Inappropriate content"),
    FALSE_INFORMATION("False information"),
    OTHER("Other");

    @Getter
    private final String detail;

    ReportType(String detail) {
        this.detail = detail;
    }
}
