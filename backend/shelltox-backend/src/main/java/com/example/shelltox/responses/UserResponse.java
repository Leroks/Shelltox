package com.example.shelltox.responses;

import com.example.shelltox.entities.Files;
import com.example.shelltox.entities.User;
import lombok.Data;

@Data
public class UserResponse {

    Long id;
    String firstName;
    String lastName;
    String userName;
    String title;
    String skills;
    Files photoUrl;
    String about;

    public UserResponse(User entity) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.userName = entity.getUserName();
        this.title = entity.getTitle();
        this.skills = entity.getSkills();
        this.photoUrl = entity.getUserPhoto();
        this.about = entity.getAbout();
    }
}
