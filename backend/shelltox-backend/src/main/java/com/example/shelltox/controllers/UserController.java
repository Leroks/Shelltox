package com.example.shelltox.controllers;

import com.example.shelltox.entities.User;
import com.example.shelltox.responses.UserResponse;
import com.example.shelltox.services.FilesService;
import com.example.shelltox.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController extends EditProfileController {

    public UserController(UserService userService, FilesService filesService) {
        super(userService, filesService);
    }

    @GetMapping
    public List<User> allUsers(){
        return userService.allUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User newUser) {

        return userService.saveUser(newUser);
    }


    @GetMapping("/{userId}")
    public UserResponse getUser(@PathVariable Long userId) {
        // exception handling !!!!
        return  new UserResponse(userService.getUserById(userId));
    }



    /*@RequestMapping("/search")
    public String getUsersByKeyword(Model model, @Param("keyword") String keyword) {
        List<User> listProducts = userService.listAll(keyword);
        model.addAttribute("listProducts", listProducts);
        //model.addAttribute("keyword", keyword);
        System.out.println(model);
        return "index";
    }*/

    @GetMapping("/activity/{userId}")
    public List<Object> getUserActivity(@PathVariable Long userId) {
        return userService.getUserActivity(userId);
    }
}


