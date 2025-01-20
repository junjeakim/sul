package com.back.Toss;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000") // React CORS 허용
public class TossController {

    private final String SECRET_KEY = "test_sk_6BYq7GWPVvPY2DOJGEEL8NE5vbo1"; // Toss Payments 테스트 키

    // 결제 요청
    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, Object> requestData) {
        try {
            String orderId = (String) requestData.get("orderId");
            String orderName = (String) requestData.get("orderName");
            Integer amount = (Integer) requestData.get("amount");

            RestTemplate restTemplate = new RestTemplate();

            // HTTP 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth(SECRET_KEY, "test_sk_6BYq7GWPVvPY2DOJGEEL8NE5vbo1"); // 올바른 Toss Secret Key 사용
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 요청 데이터 설정
            Map<String, Object> body = new HashMap<>();
            body.put("amount", amount);
            body.put("orderId", orderId);
            body.put("orderName", orderName);
            body.put("successUrl", "http://localhost:3000/success");
            body.put("failUrl", "http://localhost:3000/fail");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            String url = "https://api.tosspayments.com/v1/payments";

            // API 호출
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace(); // 에러 로그 출력
            return ResponseEntity.status(500).body("결제 요청 중 오류가 발생했습니다: " + e.getMessage());
        }
    }


    // 결제 성공 처리
    @GetMapping("/success")
    public ResponseEntity<?> handleSuccess(@RequestParam String paymentKey,
                                           @RequestParam String orderId,
                                           @RequestParam String amount) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth(SECRET_KEY, ""); // Basic Auth
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new HashMap<>();
            body.put("paymentKey", paymentKey);
            body.put("orderId", orderId);
            body.put("amount", amount);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
            String url = "https://api.tosspayments.com/v1/payments/confirm";

            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("결제 확인 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // 결제 실패 처리
    @GetMapping("/fail")
    public ResponseEntity<?> handleFail(@RequestParam String message, @RequestParam String code) {
        return ResponseEntity.badRequest().body("결제가 실패했습니다: " + message + " (코드: " + code + ")");
    }
}
