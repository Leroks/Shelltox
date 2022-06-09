package com.example.shelltox.controllers;

import com.example.shelltox.entities.Like;
import com.example.shelltox.requests.LikeCreateRequest;
import com.example.shelltox.responses.LikeResponse;
import com.example.shelltox.services.LikeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {

    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public List<LikeResponse> getAllLikes(@RequestParam Optional<Long> userId,
                                          @RequestParam Optional<Long> postId) {
        return likeService.getLikesByParameter(userId, postId);
    }

    @PostMapping
    public Like createLike(@RequestBody LikeCreateRequest request) {
        return likeService.createLike(request);
    }

    @GetMapping("/{likeId}")
    public Like getLike(@PathVariable Long likeId) {
        return likeService.getLikeById(likeId);
    }

    @DeleteMapping("/{likeId}")
    public void deleteLike(@PathVariable Long likeId) {
        likeService.deleteLikeById(likeId);
    }
}