package com.example.shelltox.controllers;

import com.example.shelltox.entities.Comment;
import com.example.shelltox.requests.CommentCreateRequest;
import com.example.shelltox.requests.CommentUpdateRequest;
import com.example.shelltox.responses.CommentResponse;
import com.example.shelltox.services.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentResponse> allComments(@RequestParam Optional<Long> userId, @RequestParam Optional<Long> postId) {
        return commentService.getCommentsByParameter(userId, postId);
    }

    @PostMapping
    public Comment createComment(@RequestBody CommentCreateRequest request) {
        return commentService.createComment(request);
    }

    @GetMapping("/{commentId}")
    public Comment getComment(@PathVariable Long commentId) {
        return commentService.getCommentById(commentId);
    }

    @PutMapping("/{commentId}")
    public Comment updateComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest request) {
        return commentService.updateCommentById(commentId, request);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteCommentById(commentId);
    }
}
