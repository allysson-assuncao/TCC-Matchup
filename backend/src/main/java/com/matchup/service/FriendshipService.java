package com.matchup.service;

import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository) {this.friendshipRepository = friendshipRepository;}

    public Friendship saveFriendship(Friendship friendshipToSave){
        return friendshipRepository.save(friendshipToSave);
    }

    @Transactional
    public boolean sendFriendshipSolicitationResponseNotification(long friendshipId, boolean accepted){
        Optional<Friendship> friendshipOp = friendshipRepository.findById(friendshipId);
        if(friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        System.out.println(accepted);
        if (accepted){
            friendship.setStatus(FriendshipStatus.APPROVED);
            friendshipRepository.save(friendship);
        } else {
            friendshipRepository.delete(friendship);
        }

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendshipId);
        return true;

    }

    public boolean existsFriendshipByUserAndFriend(Long user1Id, Long user2Id) {
        /*Optional<Friendship> friendship1 = friendshipRepository.findByUserAndFriend(user1Id, user2Id);
        Optional<Friendship> friendship2 = friendshipRepository.findByUserAndFriend(user2Id, user1Id);*/

        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

}
