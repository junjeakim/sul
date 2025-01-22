package com.back.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors()
                .and()
                .csrf().disable()  // API 서버에서는 CSRF를 비활성화
                .authorizeRequests()
                .requestMatchers("/api/member/**", "/api/kakao/login", "/api/products/**", "/images/**")
                .permitAll()  // 공개된 엔드포인트
                .requestMatchers("/api/payments/**")
                .authenticated()  // 결제 관련 API는 인증 필요
                .anyRequest().authenticated()  // 나머지 엔드포인트는 인증 필요
                .and()
                .build();
    }
}