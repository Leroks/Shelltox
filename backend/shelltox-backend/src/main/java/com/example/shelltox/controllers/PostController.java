package com.example.shelltox.controllers;

import com.example.shelltox.entities.Post;
import com.example.shelltox.entities.User;
import com.example.shelltox.requests.PostCreateRequest;
import com.example.shelltox.requests.PostUpdateRequest;
import com.example.shelltox.responses.PostResponse;
import com.example.shelltox.services.PostService;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {
    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> allPosts(@RequestParam Optional<Long> userId) {
        return postService.allPosts(userId);
    }

    @PostMapping
    public Post createPost(@RequestBody PostCreateRequest newPostRequest) {
        return postService.createPost(newPostRequest);
    }

    @GetMapping("/{postId}")
    public PostResponse getPost(@PathVariable Long postId) {

        return postService.getPostByIdWithLikes(postId);
    }

    @PutMapping("/{postId}")
    public Post updatePost(@PathVariable Long postId, @RequestBody PostUpdateRequest updatePost) {
        return postService.updatePostById(postId, updatePost);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePostById(postId);
    }

    /*@RequestMapping("/search")
    public String getPostsByKeyword(Model model, @Param("keyword") String keyword) {

        List<Post> listProducts = postService.listAll(keyword);
        model.addAttribute("listProducts", listProducts);
        //model.addAttribute("keyword", keyword);
        System.out.println(model);
        return "index1";
    }*/
}
