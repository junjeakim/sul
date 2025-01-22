package com.back.api.member.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.back.api.member.dao.MemberDao;
import com.back.api.member.dto.MemberDto;

@Service
public class MemberService {

    private final MemberDao memberDao;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberDao memberDao, PasswordEncoder passwordEncoder) {
        this.memberDao = memberDao;
        this.passwordEncoder = passwordEncoder;
    }

    // 기존 비밀번호를 BCrypt로 갱신하는 메서드
    public void updatePasswordToBCrypt(String mId) throws Exception {
        MemberDto member = memberDao.getMember(mId);
        if (member != null) {
            String plainPassword = member.getMPw();

            // 비밀번호가 이미 암호화되어 있는지 확인
            if (!passwordEncoder.matches(plainPassword, member.getMPw())) {
                String encodedPassword = passwordEncoder.encode(plainPassword);
                member.setMPw(encodedPassword);  // 암호화된 비밀번호로 갱신

                // 비밀번호를 업데이트하는 메서드 호출
                memberDao.updateMember(member);  // DB에 업데이트
            }
        }
    }

    // 아이디 중복 확인 메서드
    public boolean getCheckId(String mId) throws Exception {
        return memberDao.getCheckId(mId) == 0; // 중복 여부 확인
    }

    // 회원가입 시 비밀번호 암호화 및 저장
    public int insertMember(MemberDto memberDto) throws Exception {
        try {
        System.out.println("회원가입 서비스 호출: " + memberDto);	// 회원가입 정보 출력
    	String encodedPassword = passwordEncoder.encode(memberDto.getMPw());
        memberDto.setMPw(encodedPassword); // 암호화된 비밀번호를 세팅
        return memberDao.insertMember(memberDto);
        } catch (Exception e) {
        	System.out.println("회원 삽입 중 오류 발생: " + e.getMessage());
        	throw e;
        }
    }

    // 로그인 시 아이디 및 비밀번호 체크
    public boolean getLogin(String mId, String mPw) throws Exception {
        MemberDto member = memberDao.getMember(mId);
        if (member == null) {
            return false;		// 아이디가 존재하지 않으면 false 반환
        }
        
        // 평문 비밀번호와 암호화된 비밀번호를 비교
        return passwordEncoder.matches(mPw, member.getMPw());
    }
    
    public MemberDto getMemberById(String mId) throws Exception {
        MemberDto member = memberDao.getMember(mId); // 데이터베이스에서 조회
        if (member == null) {
            System.out.println("아이디가 존재하지 않습니다. (mId: " + mId + ")");
        }
        return member;
    }
    
    public List<MemberDto> getAllMembers() throws Exception {
    	try {
    		return memberDao.getAllMembers();
    	} catch(Exception e) {
    		throw e;
    	}
    }
    
    
}


