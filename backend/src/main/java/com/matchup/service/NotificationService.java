package com.matchup.service;

import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.model.User;
import com.matchup.model.notification.FriendshipSolicitationNotification;
import com.matchup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class NotificationService {

    public final String PENDING = "pending";

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final FriendshipRepository friendshipRepository;

    @Autowired
    private final FriendshipService friendshipService;

    @Autowired
    private final NotificationRepository notificationRepository;


    @Autowired
    public NotificationService(UserRepository userRepository, FriendshipRepository friendshipRepository, FriendshipService friendshipService, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.friendshipRepository = friendshipRepository;
        this.friendshipService = friendshipService;
    }

    public User saveUser(User userToSave) {
        //requires password verification
        return userRepository.save(userToSave);
    }

    public boolean sendFriendshipSolicitationNotification(long senderId, long receiverId){
        User receiver = userRepository.findById(receiverId).get();
        User sender = userRepository.findById(senderId).get();


        System.out.println(friendshipRepository.existsByUsers(senderId, receiverId));
        if(friendshipRepository.existsByUsers(senderId, receiverId)){
            return false;
        }

        Friendship friendship = new Friendship();
        friendship.setUser(sender);
        friendship.setFriend(receiver);
        friendship.setStatus(FriendshipStatus.PENDING);
        friendship = friendshipRepository.save(friendship);

        FriendshipSolicitationNotification friendshipSolicitationNotification = new FriendshipSolicitationNotification();
        friendshipSolicitationNotification.setFriendship(friendship);
        friendshipSolicitationNotification.setDate(LocalDateTime.now());
        friendshipSolicitationNotification.setViewed(false);
        friendshipSolicitationNotification.setUser(userRepository.findById(receiverId).get());
        receiver.addNotification(friendshipSolicitationNotification);

        receiver.addFriendship(friendship);
        sender.addFriendship(friendship);

        userRepository.save(receiver);
        userRepository.save(sender);
        notificationRepository.save(friendshipSolicitationNotification);

        return true;
    }
}
