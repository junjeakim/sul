//package com.back.naver;
//
//import java.util.Map;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.util.UriComponentsBuilder;
//import com.back.Component.JwtResponse;
//import com.back.Component.JwtTokenProvider;
//import com.back.member.Member;  // Member 클래스 임포트
//
//@RestController
//@RequestMapping("/api/naver")
//@CrossOrigin(origins = "http://localhost:3000")
//public class NaverLoginController {
//
//    private final WebClient webClient;
//    private final JwtTokenProvider jwtTokenProvider; // JwtTokenProvider 주입
//
//    // 생성자에서 JwtTokenProvider 주입
//    public NaverLoginController(WebClient.Builder webClientBuilder, JwtTokenProvider jwtTokenProvider) {
//        this.webClient = webClientBuilder.baseUrl("https://nid.naver.com").build();
//        this.jwtTokenProvider = jwtTokenProvider; // JwtTokenProvider 할당
//    }
//
//    @GetMapping("/token")
//    public ResponseEntity<?> getToken(@RequestParam String code, @RequestParam String state) {
//        String clientId = "S40I8qDoUEfjS3b8P4FU"; // 클라이언트 ID
//        String clientSecret = "ZhXwdHLM8q"; // 클라이언트 시크릿
//        String redirectUri = "http://localhost:3000"; // 리디렉션 URI
//
//        String tokenUrl = UriComponentsBuilder.fromPath("/oauth2.0/token")
//                .queryParam("grant_type", "authorization_code")
//                .queryParam("client_id", clientId)
//                .queryParam("client_secret", clientSecret)
//                .queryParam("redirect_uri", redirectUri)
//                .queryParam("code", code)
//                .queryParam("state", state)
//                .toUriString();
//
//        try {
//            Map<String, Object> response = webClient.get()
//                    .uri(tokenUrl)
//                    .retrieve()
//                    .bodyToMono(Map.class)
//                    .block();  // 동기 방식 처리
//
//            // 네이버에서 받은 토큰을 추출
//            String accessToken = (String) response.get("access_token");
//
//            // 네이버에서 받은 토큰으로 Member 객체 생성
//            Member member = new Member();
//            member.setId(accessToken);  // 네이버에서 받은 access_token을 Member의 ID로 사용
//
//            // JwtTokenProvider 인스턴스를 통해 JWT 토큰 생성
//            String jwtToken = jwtTokenProvider.createToken(member);
//
//            // JWT 토큰을 프론트엔드로 전달
//            return ResponseEntity.ok(new JwtResponse(jwtToken));  // JwtResponse 반환
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("네이버 토큰 요청 중 오류: " + e.getMessage());
//        }
//    }
//
//}
