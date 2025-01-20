package com.back.api.member.dao;

import org.apache.ibatis.annotations.Mapper;
import com.back.api.member.dto.MemberDto;

@Mapper
public interface MemberDao {
    MemberDto getMember(String memId);
    int insertMember(MemberDto memberDto);
    int getCheckId(String memId); // 아이디 중복 확인
}
