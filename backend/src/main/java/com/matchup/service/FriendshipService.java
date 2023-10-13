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

    private final FriendshipRepository friendshipRepository;

    private final NotificationRepository notificationRepository;

    private final NotificationService notificationService;

    private final FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository, NotificationRepository notificationRepository, NotificationService notificationService, FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository) {
        this.friendshipRepository = friendshipRepository;
        this.notificationRepository = notificationRepository;
        this.notificationService = notificationService;
        this.friendshipSolicitationNotificationRepository = friendshipSolicitationNotificationRepository;
    }

    public Friendship saveFriendship(Friendship friendshipToSave){
        return friendshipRepository.save(friendshipToSave);
    }


    public boolean  sendFriendshipSolicitationResponseNotification(long friendshipId, boolean accepted){
        Optional<Friendship> friendshipOp = friendshipRepository.findById(friendshipId);
        if(friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        System.out.println(accepted);
        System.out.println(friendship.getUser().getUsername());
        if (accepted){
            friendship.setStatus(FriendshipStatus.ACCEPTED);
        } else {
            friendship.setStatus(FriendshipStatus.REJECTED);
        }
        friendship.setDate(LocalDateTime.now());
        friendship = saveFriendship(friendship);

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendshipId);
        System.out.println("Em nome do pai");
        notificationService.sendFriendshipSolicitationResponseNotification(friendship.getId());
        return true;

    }

    public boolean existsFriendshipByUsersId(Long user1Id, Long user2Id) {
        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

    public String getFriendshipStatus(Long user1Id, Long user2Id) {
        if(!friendshipRepository.existsByUsers(user1Id, user2Id)) return null;
        return friendshipRepository.findStatusByUsers(user1Id, user2Id).get();
    }

    @Transactional
    public boolean endFriendship(long user1Id, long user2Id){
        Optional<Friendship> friendshipOp = friendshipRepository.findByUsers(user1Id, user2Id);
        if(friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendship.getId());
        friendshipRepository.delete(friendship);
        return true;

    }

}
