package com.example.shelltox.services;

import com.example.shelltox.entities.Files;
import com.example.shelltox.entities.User;
import com.example.shelltox.repos.CommentRepository;
import com.example.shelltox.repos.LikeRepository;
import com.example.shelltox.repos.PostRepository;
import com.example.shelltox.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;
    LikeRepository likeRepository;
    CommentRepository commentRepository;
    PostRepository postRepository;

    public UserService(UserRepository userRepository, LikeRepository likeRepository,
                       CommentRepository commentRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User newUser) {
        return userRepository.save(newUser);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public List<User> listAll(String keyword) {
        if (keyword != null) {
            return userRepository.search(keyword);
        }
        return userRepository.findAll();
    }

    /*
    public User updateUser(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User foundUser = user.get();
            foundUser.setUserName(newUser.getUserName());
            foundUser.setPassword(newUser.getPassword());
            userRepository.save(foundUser);
            return foundUser;
        }else
            return null;
    }
    */

    public User updatePhoto(Long userId, Files newUserPhoto){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User foundUser = user.get();
            foundUser.setUserPhoto(newUserPhoto);
            userRepository.save(foundUser);
            return foundUser;
        }else
            return null;
    }

    public User updateProfile(Long userId, User newUser){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User foundUser = user.get();
            if(newUser.getPassword() != null)
            foundUser.setPassword(newUser.getPassword());
            if(newUser.getTitle() != null)
            foundUser.setTitle(newUser.getTitle());
            if(newUser.getSkills() != null)
            foundUser.setSkills(newUser.getSkills());
            if(newUser.getAbout() != null)
            foundUser.setAbout(newUser.getAbout());
            if(newUser.getFirstName() != null)
            foundUser.setFirstName(newUser.getFirstName());
            if(newUser.getLastName() != null)
            foundUser.setLastName(newUser.getLastName());
            if(newUser.getPhoto() != null)
                foundUser.setPhoto(newUser.getPhoto());
            if(newUser.getUserPhoto() != null)
                foundUser.setUserPhoto(newUser.getUserPhoto());
            userRepository.save(foundUser);
            return foundUser;
        }else
            return null;
    }



    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public List<Object> getUserActivity(Long userId) {
        List<Long> postIds = postRepository.findTopByUserId(userId);
        if(postIds.isEmpty())
            return null;
        List<Object> comments = commentRepository.findUserCommentsByPostId(postIds);
        List<Object> likes = likeRepository.findUserLikesByPostId(postIds);
        List<Object> result = new ArrayList<>();
        result.addAll(comments);
        result.addAll(likes);
        return result;
    }
}