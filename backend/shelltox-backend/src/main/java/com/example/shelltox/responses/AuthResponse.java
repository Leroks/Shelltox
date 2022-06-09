package com.example.shelltox.responses;

import lombok.Data;

@Data
public class AuthResponse {

    String successMessage;
    String message;
    Long userId;
    String userName;
    String firstName;
    String lastName;
    String title;
    String about;
    String skills;
    String photo;
}
