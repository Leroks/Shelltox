package com.example.shelltox.requests;

import lombok.Data;

@Data
public class ChatCreateRequest {
    Long id;
    String text;
    String title;
    Long userId;
}
