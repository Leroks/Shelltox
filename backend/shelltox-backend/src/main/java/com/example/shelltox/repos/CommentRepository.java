package com.example.shelltox.repos;

import com.example.shelltox.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByUserIdAndPostId(Long userId, Long postId);

    List<Comment> findCommentByUserId(Long userId);

    List<Comment> findCommentByPostId(Long postId);

    @Query(value = "select 'commented on', c.post_id, u.photo, u.user_name from "
            + "comment c left join user u on u.id = c.user_id "
            + "where c.post_id in :postIds limit 5", nativeQuery = true)
    List<Object> findUserCommentsByPostId(@Param("postIds") List<Long> postIds);
}
