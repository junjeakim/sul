package com.back.Controll;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tilko")
public class TilkoController {

    @PostMapping("/adultVerification")
    public ResponseEntity<?> verifyAdult(@RequestBody Map<String, String> requestData) {
        try {
            // Tilko API 요청 URL
            String url = "https://api.tilko.net/api/v1.0/certification/adult";
            
            // 요청 헤더와 데이터 준비
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("API-Key", "e5b28a87e18a470ea0d767e4767cb059");

            // Tilko API에 전달할 데이터
            Map<String, String> body = new HashMap<>();
            body.put("Name", requestData.get("Name"));
            body.put("RegistrationNumber", requestData.get("RegistrationNumber")); // 암호화된 주민번호
            body.put("MobileNumber", requestData.get("MobileNumber"));

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            // RestTemplate으로 Tilko API 호출
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            // Tilko API 응답 반환
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Tilko API 호출 중 오류가 발생했습니다.");
        }
    }
}


