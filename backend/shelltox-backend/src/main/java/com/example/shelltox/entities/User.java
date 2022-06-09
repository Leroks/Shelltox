package com.example.shelltox.entities;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Setter
@Getter
@ToString
@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String userName;
    String password;

    String title;
    String about;
    String firstName;
    String lastName;
    String skills;
    String photo;

    @OneToOne
    @JoinColumn(name = "user_photo_id")
    Files userPhoto;
}
