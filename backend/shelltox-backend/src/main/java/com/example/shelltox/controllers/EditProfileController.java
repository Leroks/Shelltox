package com.example.shelltox.controllers;

import com.example.shelltox.entities.Files;
import com.example.shelltox.entities.User;
import com.example.shelltox.services.FilesService;
import com.example.shelltox.services.UserService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


public class EditProfileController {

    protected UserService userService;
    protected FilesService filesService;

    public EditProfileController(UserService userService, FilesService filesService) {
        this.userService = userService;
        this.filesService = filesService;
    }


    /*@PutMapping("/{userId}")
    public User updateProfile(@PathVariable Long userId, @RequestBody User newUser) {
        return userService.updateProfile(userId, newUser);
    }*/

    @PutMapping("/{userId}")
    public User updatePhoto(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        Files photo =  filesService.storeFile(file);
        return userService.updatePhoto(userId, photo);
    }

     /*
    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User newUser) {
        return userService.updateUser(userId, newUser);
    }
    */
    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUserById(userId);
    }
}

