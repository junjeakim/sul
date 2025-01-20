/* package com.back.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.back.member.Member;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret-key}")
    private String secretKey;

    private static final long TOKEN_VALIDITY = 1000L * 60 * 60 * 24; // 1일

    // JWT 토큰 생성
    public String createToken(Member member) {
        return Jwts.builder()
                .setSubject(member.getMId()) // 사용자 ID
                .setIssuedAt(new Date()) // 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY)) // 유효 기간
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // 서명
                .compact();
    }

    // Claims 추출
    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 토큰 유효성 검증
    public boolean isValidToken(String token) {
        try {
            getClaimsFromToken(token); // Claims 추출 시 유효하면 true
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
*/