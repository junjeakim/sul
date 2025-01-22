package com.back.api.member.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.back.api.member.dto.MemberDto;

@Mapper
public interface MemberDao {
	public MemberDto getMember(String memId);
    public int insertMember(MemberDto memberDto);
    public int getCheckId(String memId);
    public List<MemberDto> getAllMembers();
    
    
    int updateMember(MemberDto memberDto); // 애너테이션 방식으로 비밀번호 업데이트
}
