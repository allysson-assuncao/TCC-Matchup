package com.matchup.service;

import com.matchup.dto.NotificationDto;
import com.matchup.enums.FriendshipStatus;
import com.matchup.enums.NotificationType;
import com.matchup.model.Friendship;
import com.matchup.model.User;
import com.matchup.model.notification.DefaultNotification;
import com.matchup.model.notification.FriendshipSolicitationNotification;
import com.matchup.model.notification.Notification;
import com.matchup.repository.*;
import com.matchup.repository.notification.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class NotificationService {
    private final UserRepository userRepository;

    private final FriendshipRepository friendshipRepository;

    private final NotificationRepository notificationRepository;


    @Autowired
    public NotificationService(UserRepository userRepository, FriendshipRepository friendshipRepository, FriendshipService friendshipService, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.friendshipRepository = friendshipRepository;
    }

    /*public User saveUser(User userToSave) {
        //requires password verification
        return userRepository.save(userToSave);
    }*/

    public boolean sendFriendshipSolicitationNotification(long senderId, long receiverId){
        if(senderId == receiverId) return false;

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

    @Transactional
    public List<NotificationDto> getNotificationsByUserId(long userId) {
        Optional<List<Notification>> notificationsOp = notificationRepository.findByUserId(userId);
        if(notificationsOp.isEmpty()) return null;
        List<Notification> notifications = notificationsOp.get();
        List<NotificationDto> notificationsDto = new ArrayList<>();

        for(Notification n: notifications){
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setType(NotificationType.DEFAULT);
        }
    }
}
