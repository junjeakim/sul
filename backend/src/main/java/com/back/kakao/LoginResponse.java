package com.back.kakao;

public class LoginResponse {
    
    private String jwtToken;
    private String userInfo;

    // 생성자
    public LoginResponse(String jwtToken, String userInfo) {
        this.jwtToken = jwtToken;
        this.userInfo = userInfo;
    }

    // getter, setter
    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }
}
