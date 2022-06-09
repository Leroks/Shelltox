package com.example.shelltox.services;

import com.example.shelltox.entities.Chat;
import com.example.shelltox.entities.User;
import com.example.shelltox.repos.ChatRepository;
import com.example.shelltox.requests.ChatCreateRequest;
import com.example.shelltox.responses.ChatResponse;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private ChatRepository chatRepository;
    private UserService userService;

    public ChatService(ChatRepository chatRepository,
                       UserService userService) {
        this.chatRepository = chatRepository;
        this.userService = userService;
    }

    public List<Chat> listAll(String keyword) {
        if (keyword != null) {
            return chatRepository.search(keyword);
        }
        return chatRepository.findAll();
    }

    public List<ChatResponse> allChats(Optional<Long> userId) {
        List<Chat> list;
        if(userId.isPresent()) {
            list = chatRepository.findChatByUserId(userId.get());
        }else
            list = chatRepository.findAll();
        return list.stream().map(p -> {
            return new ChatResponse(p);}).collect(Collectors.toList());
    }

    public Chat getChatById(Long chatId) {
        return chatRepository.findById(chatId).orElse(null);
    }
    public ChatResponse getChatByIdWith(Long chatId) {
        Chat chat = chatRepository.findById(chatId).orElse(null);
        return new ChatResponse(chat);
    }

    public Chat createChat(ChatCreateRequest newChatRequest) {
        User user = userService.getUserById(newChatRequest.getUserId());
        if(user == null)
            return null;
        Chat toSave = new Chat();
        toSave.setText(newChatRequest.getText());
        toSave.setUser(user);
        toSave.setCreateDate(new Date());
        return chatRepository.save(toSave);
    }


}
