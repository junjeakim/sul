package com.back.member;

public class LoginRequest {
    private String mId;
    private String mPw;

    // Getters and Setters
    public String getMId() {
        return mId;
    }

    public void setMId(String mId) {
        this.mId = mId;
    }

    public String getMPw() {
        return mPw;
    }

    public void setMPw(String mPw) {
        this.mPw = mPw;
    }
}