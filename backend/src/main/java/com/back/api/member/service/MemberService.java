package com.back.api.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.back.api.member.dao.MemberDao;
import com.back.api.member.dto.MemberDto;

@Service
public class MemberService {

    @Autowired
    private MemberDao memberDao;

    public boolean getCheckId(String mId) throws Exception {
        return memberDao.getCheckId(mId) == 0; // 중복 여부 확인
    }

    public int insertMember(MemberDto memberDto) throws Exception {
        return memberDao.insertMember(memberDto); // 회원 가입
    }

    public boolean getLogin(String mId, String mPw) throws Exception {
        MemberDto member = memberDao.getMember(mId);
        return member != null && member.getMPw().equals(mPw); // 로그인
    }
}