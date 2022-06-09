package com.example.shelltox.responses;

import com.example.shelltox.entities.Post;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PostResponse {

    Long id;
    Long userId;
    String userName;
    String title;
    String text;
    List<LikeResponse> likes;

    Date createDate;

    public PostResponse(Post entity, List<LikeResponse> likes) {
        this.id = entity.getId();
        this.userId = entity.getUser().getId();
        this.userName = entity.getUser().getUserName();
        this.title = entity.getTitle();
        this.text = entity.getText();
        this.likes = likes;
        this.createDate = entity.getCreateDate();
    }
}
