package com.back.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // Register member endpoint
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody Member member) {
        try {
            // Check if the ID already exists
            if (memberService.isIdDuplicated(member.getMId())) {
                return ResponseEntity.status(400).body("ID is already taken.");
            }

            // Create the user and save it to the database
            memberService.saveMember(member);

            // Return success message on successful registration
            return ResponseEntity.ok("Registration successful");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error occurred during registration.");
        }
    }

    // Other methods (login, checkId) can remain the same.
}
