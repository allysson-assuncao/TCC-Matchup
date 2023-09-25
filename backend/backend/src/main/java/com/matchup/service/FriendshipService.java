package com.matchup.service;

import com.matchup.model.Friendship;
import com.matchup.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository) {this.friendshipRepository = friendshipRepository;}

    public Friendship saveAddress(Friendship friendshipToSave){
        return friendshipRepository.save(friendshipToSave);
    }

    /*public Page<Friendship> findById(Long id){
        return friendshipRepository.findById(id);
    }*/

}
