package com.example.shelltox.controllers;

import com.example.shelltox.entities.Friend;
import com.example.shelltox.entities.User;
import com.example.shelltox.requests.AddFriendRequest;
import com.example.shelltox.services.FriendService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/friend")
public class FriendController {

    private FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PostMapping
    public Friend addFriend(@RequestBody AddFriendRequest addFriendRequest) {
        return friendService.saveFriend(addFriendRequest);
    }

    @GetMapping
    public List<User> allFriends(@RequestParam Optional<Long> userId) {
        return friendService.allFriends(userId);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        friendService.deleteFriendById(id);
    }
}
