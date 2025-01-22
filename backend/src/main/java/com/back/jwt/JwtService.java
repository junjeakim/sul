package com.back.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final JwtUtil jwtUtil;

    @Autowired
    public JwtService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // JWT 생성
    public String createToken(String userId) {
        return jwtUtil.generateToken(userId); // JwtUtil의 generateToken 메서드를 호출
    }

    // JWT 검증
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token); // JwtUtil의 validateToken 메서드를 호출
    }

    // JWT에서 사용자 정보 추출
    public String getUserIdFromToken(String token) {
        return jwtUtil.getUserIdFromToken(token); // JwtUtil의 getUserIdFromToken 메서드를 호출
    }
}
