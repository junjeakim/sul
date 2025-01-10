package com.back.member;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Member {

    @Id
    private String mId; // 사용자 ID
    private String name; // 사용자 이름
    private String email; // 사용자 이메일
    private String mPw;  // 사용자 비밀번호

    // Getters and Setters
    public String getMId() {
        return mId;
    }

    public void setMId(String mId) {
        this.mId = mId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMPw() {
        return mPw;
    }

    public void setMPw(String mPw) {
        this.mPw = mPw;
    }
}
