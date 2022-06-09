package com.example.shelltox.responses;


import com.example.shelltox.entities.Friend;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FriendResponse {

    Long id;
    Long userId1;
    Long userId2;
    Date date;

    public FriendResponse(Friend entity) {
        this.id = entity.getId();
        this.userId1 = entity.getFirstUser().getId();
        this.userId2 = entity.getSecondUser().getId();
    }
}
