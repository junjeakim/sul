package com.back.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.back.Component.JwtTokenProvider;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Method to save member in the database
    public void saveMember(Member member) {
        // Encrypt the password before saving
        member.setMPw(passwordEncoder.encode(member.getMPw()));
        memberRepository.save(member);
    }

    // Check if the ID is duplicated
    public boolean isIdDuplicated(String mId) {
        return memberRepository.existsById(mId);
    }

    // Generate a JWT token for a user
    public String generateJwtToken(Member member) {
        return jwtTokenProvider.createToken(member);
    }
}
