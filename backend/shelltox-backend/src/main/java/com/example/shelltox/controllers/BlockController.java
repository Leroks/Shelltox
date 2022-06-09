package com.example.shelltox.controllers;


import com.example.shelltox.entities.Block;
import com.example.shelltox.entities.Friend;
import com.example.shelltox.entities.User;
import com.example.shelltox.requests.AddBlockRequest;
import com.example.shelltox.requests.AddFriendRequest;
import com.example.shelltox.services.BlockService;
import com.example.shelltox.services.FriendService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/block")
public class BlockController {

    private BlockService blockService;

    public BlockController(BlockService blockService) {
        this.blockService = blockService;
    }

    @PostMapping
    public Block addFriend(@RequestBody AddBlockRequest addBlockRequest) {
        return blockService.createBlock(addBlockRequest);
    }

    @GetMapping
    public List<User> allBlocks(@RequestParam Optional<Long> userId) {
        return blockService.allBlocks(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteBlock(@PathVariable Long id) {
        blockService.deleteBlockById(id);
    }

}
