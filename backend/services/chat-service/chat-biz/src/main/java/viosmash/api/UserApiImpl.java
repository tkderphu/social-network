package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.chat.api.UserApi;
import viosmash.chat.api.UserDTO;
import viosmash.dal.dataobject.Member;
import viosmash.dal.repo.MemberRepository;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;

@RequiredArgsConstructor
@RestController
@RequestMapping(UserApi.PREFIX)
public class UserApiImpl implements UserApi {
    private final MemberRepository memberRepository;
    @Override
    @PutMapping("/members")
    public CommonResult<Boolean> updateUserInfo(@RequestBody UserDTO userDTO) {
        Member member = memberRepository.findById(userDTO.getId())
                .orElse(null);
        if(member == null) {
            member = BeanUtil.copy(userDTO, Member.class);
        } else {
            BeanUtil.setTargetIfNotNull(member, userDTO);
        }
        memberRepository.save(member);
        return CommonResult.success(true);
    }
}
