package com.example.shelltox.services;
import com.example.shelltox.entities.User;
import com.example.shelltox.entities.Friend;
import com.example.shelltox.repos.FriendRepository;
import com.example.shelltox.repos.UserRepository;

import com.example.shelltox.requests.AddFriendRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendService {

    FriendRepository friendRepository;

    UserRepository userRepository;
    UserService userService;

    public FriendService(FriendRepository friendRepository, UserRepository userRepository, UserService userService) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public Friend saveFriend(AddFriendRequest addFriendRequest){
        User user1 = userService.getUserById(addFriendRequest.getFirstUserId());

        User user2 = userService.getUserById(addFriendRequest.getSecondUserId());


        if(user1 == null || user2 == null)
            return null;

        Friend friend = new Friend();

        if( !(friendRepository.existsByFirstUserAndSecondUser(user1,user2)) ){

            friend.setId(addFriendRequest.getId());
            friend.setFirstUser(user1);
            friend.setSecondUser(user2);
            return friendRepository.save(friend);
        }
        return null;
    }

    public List<User> allFriends(Optional<Long> userId) {

        User currentUser = userService.getUserById(userId.get());
        List<Friend> list1= friendRepository.findByFirstUser(currentUser);
        List<Friend> list2= friendRepository.findBySecondUser(currentUser);

        List<User> friendUsers = new ArrayList<>();

        for (Friend friend : list1) {
            friendUsers.add(userService.getUserById((friend.getSecondUser().getId())));
        }
        for (Friend friend : list2) {
            friendUsers.add(userService.getUserById((friend.getFirstUser().getId())));
        }
        return friendUsers;
    }

    public void deleteFriendById(Long id) {
        friendRepository.deleteById(id);
    }

    public List<Friend> listAll() {
        return friendRepository.findAll();
    }



}