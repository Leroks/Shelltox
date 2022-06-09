package com.example.shelltox.repos;

import com.example.shelltox.entities.Friend;

import com.example.shelltox.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend,Long> {
    boolean existsByFirstUserAndSecondUser(User first,User second);


    List<Friend> findByFirstUser(User user);
    List<Friend> findBySecondUser(User user);

}