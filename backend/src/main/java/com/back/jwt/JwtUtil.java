package com.back.jwt;

import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	@Value("${jwt.secret}")
    private String secretKey;
	
    private long expirationTime;

    public JwtUtil() {
        // SecretKeyGenerator를 사용하여 강력한 비밀 키 생성
        this.secretKey = SecretKeyGenerator.generateStrongSecretKey(); // 256비트 키 생성
        this.expirationTime = 3600000; // 예시로 만료 시간 1시간 설정
    }

    private SecretKey getSecretKey() {
        return new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());
    }
    
    public String generateToken(String userId) {
        // SecretKey 객체 생성
        SecretKey key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key) // SecretKey 객체를 사용
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            // SecretKey 객체 생성
            SecretKey key = getSecretKey();

            Jwts.parserBuilder()
                .setSigningKey(key) // SecretKey 객체 사용
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserIdFromToken(String token) {
        // SecretKey 객체 생성
        SecretKey key = getSecretKey();

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key) // SecretKey 객체 사용
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}