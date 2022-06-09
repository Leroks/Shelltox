package com.example.shelltox.controllers;

import com.example.shelltox.entities.Post;
import com.example.shelltox.entities.User;
import com.example.shelltox.services.PostService;
import com.example.shelltox.services.UserService;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/search")
public class SearchController{

    private UserService userService;
    private PostService postService;

    public SearchController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    /*@RequestMapping("/users")
    public List<User> getUsersByKeyword(Model model, @Param("keyword") String keyword) {
        List<User> listProducts = userService.listAll(keyword);
        model.addAttribute("listProducts", listProducts);
        //model.addAttribute("keyword", keyword);
        System.out.println(listProducts);
        return listProducts;
    }

    @RequestMapping("/posts")
    public List<Post> getPostsByKeyword(Model model, @Param("keyword") String keyword) {

        List<Post> listProducts = postService.listAll(keyword);
        model.addAttribute("listProducts", listProducts);
        //model.addAttribute("keyword", keyword);
        System.out.println(model);
        return listProducts;
    }*/

    @RequestMapping("/all")
    public List<Object> getAllByKeyword(Model model, @Param("keyword") String keyword) {

        List<Post> listPosts = postService.listAll(keyword);
        List<User> listUsers = userService.listAll(keyword);
        model.addAttribute("listPosts", listPosts);
        model.addAttribute("listUsers", listUsers);

        List<Object> newList = Stream.concat(listPosts.stream(), listUsers.stream())
                .collect(Collectors.toList());
        System.out.println(newList);
        return newList;
    }
}


