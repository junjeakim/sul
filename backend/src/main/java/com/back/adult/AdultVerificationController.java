/*
 * package com.back.adult;
 * 
 * import java.util.HashMap; import java.util.Map;
 * 
 * import org.springframework.http.HttpEntity; import
 * org.springframework.http.HttpHeaders; import
 * org.springframework.http.HttpStatus; import
 * org.springframework.http.MediaType; import
 * org.springframework.http.ResponseEntity; import
 * org.springframework.web.bind.annotation.PostMapping; import
 * org.springframework.web.bind.annotation.RequestBody; import
 * org.springframework.web.bind.annotation.RestController; import
 * org.springframework.web.client.HttpClientErrorException; import
 * org.springframework.web.client.RestTemplate;
 * 
 * @RestController public class AdultVerificationController {
 * 
 * @PostMapping("/adultVerification") public ResponseEntity<?>
 * verifyAdult(@RequestBody Map<String, String> requestData) { try { String
 * apiUrl = "https://api.tilko.net/api/v1.0/certification/adult";
 * 
 * HttpHeaders headers = new HttpHeaders();
 * headers.setContentType(MediaType.APPLICATION_JSON); headers.set("API-Key",
 * "YOUR_API_KEY_HERE"); // Tilko API-Key
 * 
 * Map<String, String> body = new HashMap<>(); body.put("Name",
 * requestData.get("Name")); body.put("RegistrationNumber",
 * requestData.get("RegistrationNumber")); // 암호화된 주민등록번호
 * body.put("MobileNumber", requestData.get("MobileNumber"));
 * 
 * HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
 * 
 * RestTemplate restTemplate = new RestTemplate(); ResponseEntity<String>
 * response = restTemplate.postForEntity(apiUrl, entity, String.class);
 * 
 * return ResponseEntity.ok(response.getBody()); } catch
 * (HttpClientErrorException e) { // 403 또는 Tilko API 관련 오류 처리 return
 * ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString()); }
 * catch (Exception e) { e.printStackTrace(); return
 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
 * .body("Internal Server Error 발생"); } }
 * 
 * }
 */