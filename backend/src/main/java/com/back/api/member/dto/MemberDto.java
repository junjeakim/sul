package com.back.api.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MemberDto {
    @JsonProperty("mNum")
    private String mNum;

    @JsonProperty("mId")
    private String mId;

    @JsonProperty("mPw")
    private String mPw;

    @JsonProperty("mPw2")
    private String mPw2;

    @JsonProperty("mName")
    private String mName;

    @JsonProperty("mBirthday")
    private String mBirthday;

    @JsonProperty("mAddr")
    private String mAddr;

    @JsonProperty("mEmail")
    private String mEmail;

    @JsonProperty("mEmail2")
    private String mEmail2;

    @JsonProperty("mPhone")
    private String mPhone;

    @JsonProperty("regTM")
    private String regTM;
}