package viosmash.pojo;

import lombok.Data;
import viosmash.enums.PageConstant;

import java.util.List;

@Data
public class PageResult <T>{
    private int page = PageConstant.page;
    private int limit = PageConstant.limit;
    private List<T> data;
    private int totalPage;
    public PageResult(int page, int limit, List<T> data) {
        this.page = page;
        this.limit = limit;
        this.data = data;
    }
    public PageResult(int page, int limit, List<T> data, int totalPage) {
        this.page = page;
        this.limit = limit;
        this.data = data;
        this.totalPage = totalPage;
    }
    public PageResult() {

    }

}
