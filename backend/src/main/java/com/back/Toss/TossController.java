package com.back.Toss;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import com.back.Toss.PaymentRequest;  // Adjust this import based on your package structure

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class TossController {

    @Value("${toss.secret.key}")
    private String secretKey; // Toss API Secret Key

    private static final String TOSS_API_URL = "https://api.tosspayments.com/v1/payments";

    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(@RequestBody PaymentRequest request) {
        try {
            // 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(secretKey); // Toss Secret Key from application.properties

            // 요청 데이터 설정
            Map<String, Object> paymentRequest = Map.of(
                "orderId", request.getOrderId(),
                "orderName", request.getOrderName(),
                "amount", request.getAmount(),
                "successUrl", "http://localhost:3000/success",
                "failUrl", "http://localhost:3000/fail"
            );

            // 요청 엔티티 생성
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(paymentRequest, headers);

            // Toss Payments API 호출
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(
                TOSS_API_URL,
                entity,
                String.class
            );

            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            e.printStackTrace();
            // Return appropriate error response based on HTTP error status
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            e.printStackTrace();
            // Return a generic error message for unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 요청 중 오류가 발생했습니다.");
        }
    }
}
