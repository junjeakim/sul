package com.back.jwt;

import java.security.SecureRandom;

public class SecretKeyGenerator {
    public static String generateStrongSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32]; // 32바이트 = 256비트
        secureRandom.nextBytes(key);
        return new String(key); // 바이트 배열을 문자열로 변환
    }
}
