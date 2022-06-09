package com.example.shelltox.repos;

import com.example.shelltox.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

    @Query("SELECT p FROM User p WHERE p.firstName LIKE %?1% or p.lastName LIKE %?1%")
    List<User> search(String keyword);

}
