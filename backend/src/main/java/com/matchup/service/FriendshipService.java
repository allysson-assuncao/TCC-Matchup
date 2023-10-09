package com.matchup.service;

import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.repository.FriendshipRepository;
import com.matchup.repository.notification.FriendshipSolicitationNotificationRepository;
import com.matchup.repository.notification.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FriendshipService {

    @Autowired
    private final FriendshipRepository friendshipRepository;

    @Autowired
    private final NotificationRepository notificationRepository;

    @Autowired
    private final FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository, NotificationRepository notificationRepository, FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository) {
        this.friendshipRepository = friendshipRepository;
        this.notificationRepository = notificationRepository;
        this.friendshipSolicitationNotificationRepository = friendshipSolicitationNotificationRepository;
    }

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
            System.out.println(LocalDateTime.now());
            friendship.setDate(LocalDateTime.now());
            System.out.println(friendship.getDate());
            saveFriendship(friendship);
        } else {
            friendshipRepository.delete(friendship);
        }

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendshipId);
        return true;

    }

    public boolean existsFriendshipByUserAndFriend(Long user1Id, Long user2Id) {
        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

    @Transactional
    public boolean endFriendship(long user1Id, long user2Id){
        Optional<Friendship> friendshipOp = friendshipRepository.findByUsers(user1Id, user2Id);
        System.out.println();
        if(friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        friendshipRepository.delete(friendship);
        return true;

    }

}
