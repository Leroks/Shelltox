package com.example.shelltox.repos;

import com.example.shelltox.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostByUserId(Long userId);

    @Query("SELECT p FROM Post p WHERE p.title LIKE %?1% or p.text LIKE %?1%")
    List<Post> search(String keyword);

    @Query(value = "select id from post where user_id = :userId order by create_date desc limit 5",
            nativeQuery = true)
    List<Long> findTopByUserId(@Param("userId") Long userId);
}
