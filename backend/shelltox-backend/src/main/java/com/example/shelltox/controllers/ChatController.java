package com.example.shelltox.controllers;

import com.example.shelltox.entities.Chat;
import com.example.shelltox.requests.ChatCreateRequest;
import com.example.shelltox.responses.ChatResponse;
import com.example.shelltox.responses.PostResponse;
import com.example.shelltox.services.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/{chatId}")
    public ChatResponse getChat(@PathVariable Long chatId) {

        return chatService.getChatByIdWith(chatId);
    }

    @GetMapping
    public List<ChatResponse> allPosts(@RequestParam Optional<Long> userId) {
        return chatService.allChats(userId);
    }

    @PostMapping
    public Chat createChat(@RequestBody ChatCreateRequest newChatRequest) {
        return chatService.createChat(newChatRequest);
    }

}
