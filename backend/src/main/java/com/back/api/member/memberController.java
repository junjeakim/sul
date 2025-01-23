package com.back.api.member;

import java.util.HashMap;
import java.util.List;
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
    
    // 모든 회원 정보를 조회하는 API
    @GetMapping("/members")
    public List<MemberDto> getAllMembers() {
        try {
        	
            // MemberService에서 모든 회원 목록을 가져옴
            return memberService.getAllMembers();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    
    
    
    
    // 로그인
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody MemberDto memberDto) {
        // 로그 추가: 전돨된 mId와 mPw값확인
        System.out.println("받은 아이디: " + memberDto.getMId());
        System.out.println("받은비밀번호: " + memberDto.getMPw());
        
        Map<String, Object> response = new HashMap<>();
        
        // 아이디와 비밀번호가 비어있는지 확인
        if (memberDto.getMId() == null || memberDto.getMPw() == null) {
            response.put("success", false);
            response.put("message", "아이디와 비밀번호를 입력해 주세요.");
            return response;
        }

        try {
            // 아이디가 존재하는지 확인
            MemberDto member = memberService.getMemberById(memberDto.getMId());
            if (member == null) {
                response.put("success", false);
                response.put("message", "아이디가 존재하지 않습니다.");
                return response;
            }

            // 로그인 결과를 받아옵니다.
            boolean loginResult = memberService.getLogin(memberDto.getMId(), memberDto.getMPw());

            if (loginResult) {
                // 로그인 성공 시 토큰을 생성합니다.
                String token = jwtUtil.generateToken(memberDto.getMId());
                response.put("success", true);
                response.put("token", token);
            } else {
                // 로그인 실패 시 ID 또는 비밀번호 오류를 메시지로 반환
                response.put("success", false);
                response.put("message", "아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            // 예외 발생 시 메시지 출력
            response.put("success", false);
            response.put("message", "로그인 중 오류가 발생했습니다.");
            e.printStackTrace(); // 디버깅을 위해 스택 트레이스 출력
        }
        return response;
    }

    // 아이디 중복 확인
    @GetMapping("/id-check")
    public Map<String, Object> checkId(@RequestParam(name = "mId") String mId) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean isAvailable = memberService.getCheckId(mId);  // This line calls getCheckId
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
            e.printStackTrace();
        }
        return response;
    }
}