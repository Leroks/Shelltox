package com.example.shelltox.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.shelltox.entities.Like;
import com.example.shelltox.entities.Post;
import com.example.shelltox.entities.User;
import com.example.shelltox.repos.LikeRepository;
import com.example.shelltox.requests.LikeCreateRequest;
import com.example.shelltox.responses.LikeResponse;
import org.springframework.stereotype.Service;



@Service
public class LikeService {

    private LikeRepository likeRepository;
    private UserService userService;
    private PostService postService;

    public LikeService(LikeRepository likeRepository, UserService userService,
                       PostService postService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;

    }

    public List<LikeResponse> getLikesByParameter(Optional<Long> userId, Optional<Long> postId) {
        List<Like> list;
        if(userId.isPresent() && postId.isPresent()) {
            list = likeRepository.findLikeByUserIdAndPostId(userId.get(), postId.get());
        }else if(userId.isPresent()) {
            list = likeRepository.findLikeByUserId(userId.get());
        }else if(postId.isPresent()) {
            list = likeRepository.findLikeByPostId(postId.get());
        }else
            list = likeRepository.findAll();
        return list.stream().map(like -> new LikeResponse(like)).collect(Collectors.toList());
    }

    public Like getLikeById(Long LikeId) {
        return likeRepository.findById(LikeId).orElse(null);
    }

    public Like createLike(LikeCreateRequest request) {
        User user = userService.getUserById(request.getUserId());
        Post post = postService.getPostById(request.getPostId());
        if(user != null && post != null) {
            Like likeToSave = new Like();
            likeToSave.setId(request.getId());
            likeToSave.setPost(post);
            likeToSave.setUser(user);
            return likeRepository.save(likeToSave);
        }else
            return null;
    }

    public void deleteLikeById(Long likeId) {
        likeRepository.deleteById(likeId);
    }


}