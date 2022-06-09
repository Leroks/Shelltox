package com.example.shelltox.requests;

import lombok.Data;


@Data
public class AddFriendRequest {
    Long id;
    Long firstUserId;
    Long secondUserId;
}
