package com.example.shelltox.repos;

import com.example.shelltox.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findChatByUserId(Long userId);

    @Query("SELECT c FROM Chat c WHERE c.title LIKE %?1% or c.text LIKE %?1%")
    List<Chat> search(String keyword);

    @Query(value = "select id from chat where user_id = :userId order by create_date desc limit 5",
            nativeQuery = true)
    List<Long> findTopByUserId(@Param("userId") Long userId);
}
