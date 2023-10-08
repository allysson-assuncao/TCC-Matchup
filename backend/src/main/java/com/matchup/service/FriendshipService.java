package com.matchup.service;

import com.matchup.model.Friendship;
import com.matchup.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public boolean existsFriendshipByUserAndFriend(Long user1Id, Long user2Id) {
        /*Optional<Friendship> friendship1 = friendshipRepository.findByUserAndFriend(user1Id, user2Id);
        Optional<Friendship> friendship2 = friendshipRepository.findByUserAndFriend(user2Id, user1Id);*/

        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

}
