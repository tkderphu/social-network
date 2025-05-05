package viosmash.pojo;

public class PagingRequest {

    private final int page = 1;
    private final int limit = 20;

    public int getLimit() {
        return limit;
    }

    public int getPage() {
        return page;
    }
}
