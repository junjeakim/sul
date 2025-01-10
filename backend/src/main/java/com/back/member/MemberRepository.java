package com.back.member;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
    // Add query method for checking duplicate ID
    boolean existsById(String mId);
}
