package viosmash.controller.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import viosmash.dal.dataobject.Tag;
import viosmash.pojo.CommonResult;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping
@RestController("/api/tags")
public class TagController {

    @GetMapping
    public CommonResult<List<Tag>> search(@RequestParam("name") String name) {

    }
}
