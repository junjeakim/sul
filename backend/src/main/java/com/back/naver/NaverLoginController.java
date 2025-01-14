package com.back.naver;

import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/naver")
@CrossOrigin(origins = "http://localhost:3000")
public class NaverLoginController {

    @GetMapping("/token")
    public ResponseEntity<?> getToken(@RequestParam String code) {
        String clientId = "S40I8qDoUEfjS3b8P4FU";
        String clientSecret = "ZhXwdHLM8q";
        String redirectUri = "http://localhost:3000";
        String tokenUrl = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code" +
                "&client_id=" + clientId +
                "&client_secret=" + clientSecret +
                "&redirect_uri=" + redirectUri +
                "&code=" + code;

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.GET, null, Map.class);
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            System.err.println("네이버 토큰 요청 중 오류: " + e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body("네이버 토큰 요청 중 오류: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("서버 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> naverLogin(@RequestBody Map<String, String> tokenMap) {
        String accessToken = tokenMap.get("accessToken");
        System.out.println("수신된 Access Token: " + accessToken);

        if (accessToken == null || accessToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Access Token이 유효하지 않습니다.");
        }

        // 사용자 정보 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.GET,
                entity,
                String.class
            );

            return ResponseEntity.ok(response.getBody()); // 사용자 정보 반환
        } catch (HttpClientErrorException e) {
            System.err.println("네이버 API 호출 중 오류: " + e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body("네이버 API 호출 중 오류: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("서버 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류: " + e.getMessage());
        }
    }
}
