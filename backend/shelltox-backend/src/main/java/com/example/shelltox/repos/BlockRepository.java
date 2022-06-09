package com.example.shelltox.repos;

import com.example.shelltox.entities.Block;
import com.example.shelltox.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlockRepository extends JpaRepository<Block,Long> {

    boolean existsByBlockeeAndBlocker(User blocker, User blockee);

    List<Block> findByBlockee(User user);
    List<Block> findByBlocker(User user);
}
