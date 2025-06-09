package viosmash.controller.share;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.interaction.enums.ApiConstant;
import viosmash.services.ShareService;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiConstant.APP_PREFIX + "/shares")
public class ShareController {
    private final ShareService shareService;
}
