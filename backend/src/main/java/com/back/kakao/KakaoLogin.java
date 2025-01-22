package com.back.kakao;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.back.jwt.JwtService;

@RestController
@RequestMapping("/api/kakao")
@CrossOrigin(origins = "http://localhost:3000")
public class KakaoLogin {

    @Autowired
    private JwtService jwtService; // JWT 서비스 의존성 주입 (JWT 생성 및 유효성 검증)

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

            // 3. 사용자 정보 파싱
            String userInfo = response.getBody();
            // 여기에 필요한 사용자 정보 파싱 코드 추가 (예: 닉네임, 프로필 이미지 등)
            
            // 4. JWT 발급
            String jwtToken = jwtService.createToken(userInfo); // 사용자 정보를 기반으로 JWT 생성

            return ResponseEntity.ok(new LoginResponse(jwtToken, userInfo)); // JWT와 사용자 정보 반환
        } catch (HttpClientErrorException e) {
            System.err.println("카카오 API 호출 중 오류: " + e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body("카카오 API 호출 중 오류: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("서버 오류: " + e.getMessage());
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
            System.err.println("토큰 검증 실패: " + e.getMessage());
            return "Error: " + e.getResponseBodyAsString(); // 카카오에서 반환된 오류 메시지 포함
        } catch (Exception e) {
            System.err.println("토큰 검증 실패: " + e.getMessage());
            return "Error: " + e.getMessage();
        }
    }
}
