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

    private final NotificationService notificationService;

    @Autowired
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


    public boolean sendFriendshipSolicitationResponseNotification(long friendshipId, boolean accepted){
        Optional<Friendship> friendshipOp = friendshipRepository.findById(friendshipId);
        if(friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        System.out.println(accepted);
        if (accepted){
            friendship.setStatus(FriendshipStatus.ACCEPTED);
        } else {
            friendshipRepository.delete(friendship);
        }
        friendship.setDate(LocalDateTime.now());
        saveFriendship(friendship);

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendshipId);
        notificationService.sendFriendshipSolicitationResponseNotification(friendship);
        return true;

    }

    public boolean existsFriendshipByUserAndFriend(Long user1Id, Long user2Id) {
        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

    @Transactional
    public boolean endFriendship(long user1Id, long user2Id){
        Optional<Friendship> friendshipOp = friendshipRepository.findByUsers(user1Id, user2Id);
        if(friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        friendshipRepository.delete(friendship);
        return true;

    }

}
