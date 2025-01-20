package com.back.api.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.back.api.member.dto.MemberDto;
import com.back.api.member.service.MemberService;
import com.back.jwt.JwtUtil;

@RestController
@RequestMapping("/api/member")
public class memberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtUtil jwtUtil;

    // 로그인
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody MemberDto memberDto) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean loginResult = memberService.getLogin(memberDto.getMId(), memberDto.getMPw());
            if (loginResult) {
                String token = jwtUtil.generateToken(memberDto.getMId());
                response.put("success", true);
                response.put("token", token);
            } else {
                response.put("success", false);
                response.put("message", "Invalid ID or password.");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred.");
        }
        return response;
    }

    // 아이디 중복 확인
    @GetMapping("/id-check")
    public Map<String, Object> checkId(@RequestParam(name = "mId") String mId) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean isAvailable = memberService.getCheckId(mId);
            response.put("success", true);
            response.put("isAvailable", isAvailable);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while checking the ID.");
        }
        return response;
    }


    // 회원가입
    @PostMapping("/join")
    public Map<String, Object> join(@RequestBody MemberDto memberDto) {
        Map<String, Object> response = new HashMap<>();
        try {
            int result = memberService.insertMember(memberDto);
            if (result > 0) {
                response.put("success", true);
                response.put("message", "회원가입 완료");
            } else {
                response.put("success", false);
                response.put("message", "회원가입 실패");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "회원가입 중 오류 발생");
        }
        return response;
    }
}
