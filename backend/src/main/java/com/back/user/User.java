package com.back.user;
// 사용자 등록 및 로그인 구현중 

import jakarta.persistence.*;

@Entity
@Table(name = "member")
public class User {

    @Id
    @Column(name = "mId", nullable = false, unique = true)
    private String id;

    @Column(name = "mPw", nullable = false)
    private String password;

    @Column(name = "mName", nullable = false)
    private String name;

    @Column(name = "mEmail", nullable = false)
    private String email;

    // 기본 생성자
    public User() {
    }

    // 매개변수를 가진 생성자
    public User(String id, String password, String name, String email) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    // Getter 및 Setter 메서드
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}
