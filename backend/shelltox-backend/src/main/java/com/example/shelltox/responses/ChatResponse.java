package com.example.shelltox.responses;

import com.example.shelltox.entities.Chat;
import lombok.Data;

@Data
public class ChatResponse {
    Long id;
    Long userId;
    String userName;
    String title;
    String text;

    public ChatResponse(Chat entity) {
        this.id = entity.getId();
        this.userId = entity.getUser().getId();
        this.userName = entity.getUser().getUserName();
        this.title = entity.getTitle();
        this.text = entity.getText();
    }
}
