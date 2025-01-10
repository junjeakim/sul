package com.back.kakao;

import java.util.Map;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/kakao")
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class KakaoLogin {

    @PostMapping("/login")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> tokenMap) {
        String accessToken = tokenMap.get("accessToken");
        System.out.println("수신된 Access Token: " + accessToken);

        if (accessToken == null || accessToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Access Token이 유효하지 않습니다.");
        }

        // 1. 토큰 유효성 검증
        String tokenValidationResult = validateKakaoAccessToken(accessToken);
        if (tokenValidationResult.startsWith("Error")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("액세스 토큰 검증 실패: " + tokenValidationResult);
        }

        // 2. 사용자 정보 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                entity,
                String.class
            );

            return ResponseEntity.ok(response.getBody()); // 사용자 정보 반환
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("카카오 API 호출 중 오류: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류: " + e.getMessage());
        }
    }

    // 카카오 액세스 토큰의 유효성을 검사하는 메서드
    public String validateKakaoAccessToken(String accessToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v1/user/access_token_info",
                HttpMethod.GET,
                entity,
                String.class
            );

            System.out.println("토큰 검증 성공: " + response.getBody());
            return response.getBody(); // 유효한 경우 JSON 문자열 반환
        } catch (HttpClientErrorException e) {
            System.out.println("토큰 검증 실패: " + e.getMessage());
            return "Error: " + e.getResponseBodyAsString(); // 카카오에서 반환된 오류 메시지 포함
        } catch (Exception e) {
            System.out.println("토큰 검증 실패: " + e.getMessage());
            return "Error: " + e.getMessage();
        }
    }
}
