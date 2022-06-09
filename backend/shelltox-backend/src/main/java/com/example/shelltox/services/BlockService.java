package com.example.shelltox.services;


import com.example.shelltox.entities.Block;
import com.example.shelltox.entities.Friend;
import com.example.shelltox.entities.User;
import com.example.shelltox.repos.BlockRepository;
import com.example.shelltox.requests.AddBlockRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlockService {
    UserService userService;
    BlockRepository blockRepository;

    public BlockService(UserService userService, BlockRepository blockRepository){
        this.userService = userService;
        this.blockRepository = blockRepository;
    }

    public Block createBlock(AddBlockRequest addBlockRequest){
        User blockee = userService.getUserById(addBlockRequest.getBlockee());

        User blocker = userService.getUserById(addBlockRequest.getBlocker());


        if(blockee == null || blocker == null)
            return null;

        Block block = new Block();

        if( !(blockRepository.existsByBlockeeAndBlocker(blocker,blockee)) ){

            block.setId(addBlockRequest.getId());
            block.setBlockee(blockee);
            block.setBlocker(blocker);
            return blockRepository.save(block);
        }
        return null;
    }

    public List<User> allBlocks(Optional<Long> userId) {

        User currentUser = userService.getUserById(userId.get());
        List<Block> list1= blockRepository.findByBlockee(currentUser);
        List<Block> list2= blockRepository.findByBlocker(currentUser);

        List<User> blockUsers = new ArrayList<>();

        for (Block block : list1) {
            blockUsers.add(userService.getUserById((block.getBlocker().getId())));
        }
        for (Block block : list2) {
            blockUsers.add(userService.getUserById((block.getBlockee().getId())));
        }
        return blockUsers;
    }

    public void deleteBlockById(Long id) {
        blockRepository.deleteById(id);
    }
}
