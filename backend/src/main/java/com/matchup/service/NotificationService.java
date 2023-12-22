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
import com.matchup.repository.notification.FriendshipSolicitationNotificationRepository;
import com.matchup.repository.notification.NotificationRepository;
import com.matchup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
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

    private final ImageService imageService;
    private final NotificationRepository notificationRepository;

    private final FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository;

    @Autowired
    public NotificationService(UserRepository userRepository, FriendshipRepository friendshipRepository, ImageService imageService, NotificationRepository notificationRepository, FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository) {
        this.userRepository = userRepository;
        this.friendshipRepository = friendshipRepository;
        this.imageService = imageService;
        this.notificationRepository = notificationRepository;
        this.friendshipSolicitationNotificationRepository = friendshipSolicitationNotificationRepository;
    }

    public NotificationDto sendFriendshipSolicitationNotification(long senderId, long receiverId) {
        if (senderId == receiverId) return null;

        User receiver = userRepository.findById(receiverId).get();
        User sender = userRepository.findById(senderId).get();

        System.out.println(friendshipRepository.existsByUsers(senderId, receiverId));
        Optional<Friendship> friendshipOp = friendshipRepository.findByUsers(senderId, receiverId);
        Friendship friendship = null;
        if (friendshipOp.isPresent() && friendshipOp.get().getStatus().equals(FriendshipStatus.REJECTED)) {
            friendship = friendshipOp.get();
            friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendship.getId());
            friendship.setDate(null);
        } else if (friendshipOp.isPresent() && !friendshipOp.get().getStatus().equals(FriendshipStatus.REJECTED)) {
            return null;
        } else {
            friendship = new Friendship();
        }
        friendship.setUser(sender);
        friendship.setFriend(receiver);
        friendship.setStatus(FriendshipStatus.PENDING);
        friendship = friendshipRepository.save(friendship);

        FriendshipSolicitationNotification fSNotification = new FriendshipSolicitationNotification();
        fSNotification.setFriendship(friendship);
        fSNotification.setDate(LocalDateTime.now());
        fSNotification.setViewed(false);
        fSNotification.setUser(userRepository.findById(receiverId).get());
        //receiver.addNotification(fSNotification);

        fSNotification = notificationRepository.save(fSNotification);

        NotificationDto notificationDto = NotificationDto.builder()
                .friendshipId(friendship.getId())
                .id(fSNotification.getId())
                .receiverId(receiverId)
                .senderId(senderId)
                .senderUsername(sender.getUsername())
                .type(NotificationType.PENDING)
                .date(fSNotification.getDate())
                .viewed(fSNotification.isViewed())
                .senderProfilePicture(imageService.getFormattedProfilePictureById(senderId, 64, 64))
                .build();

        System.out.println(notificationDto);


        return notificationDto;
    }

    @Transactional
    public List<NotificationDto> getNotificationsByUsername(UserDetails userDetails) {
        long userId = userRepository.getIdByUsername(userDetails.getUsername());

        notificationRepository.updateStatusToViewedByUserId(userId);
        Optional<List<Notification>> notificationsOp = notificationRepository.findByUserId(userId);
        if (notificationsOp.isEmpty()) return null;
        List<Notification> notifications = notificationsOp.get();
        List<NotificationDto> notificationsDto = new ArrayList<>();

        for (Notification n : notifications) {

            NotificationDto nDto = new NotificationDto();
            nDto.setId(n.getId());
            nDto.setDate(n.getDate());
            nDto.setViewed(n.isViewed());
            if (n instanceof FriendshipSolicitationNotification) {
                FriendshipSolicitationNotification nSN = (FriendshipSolicitationNotification) n;
                nDto.setFriendshipId(nSN.getFriendship().getId());
                nDto.setReceiverId(n.getUser().getId());
                switch (nSN.getFriendship().getStatus()) {
                    case PENDING:
                        nDto.setType(NotificationType.PENDING);
                        nDto.setSenderId(nSN.getFriendship().getUser().getId());
                        nDto.setSenderUsername(nSN.getFriendship().getUser().getUsername());
                        nDto.setSenderProfilePicture(imageService.getFormattedProfilePictureById(nSN.getFriendship().getUser().getId(), 64, 64));
                        break;
                    case ACCEPTED:
                        nDto.setType(NotificationType.ACCEPTED);
                        nDto.setSenderId(nSN.getFriendship().getFriend().getId());
                        nDto.setSenderUsername(nSN.getFriendship().getFriend().getUsername());
                        nDto.setSenderProfilePicture(imageService.getFormattedProfilePictureById(nSN.getFriendship().getFriend().getId(), 64, 64));
                        break;
                    /*case REJECTED:
                        nDto.setType(NotificationType.REJECTED);
                        nDto.setSenderId(nSN.getFriendship().getFriend().getId());
                        nDto.setSenderUsername(nSN.getFriendship().getFriend().getUsername());
                        nDto.setSenderProfilePicture(imageService.getFormattedProfilePictureById(nSN.getFriendship().getFriend().getId(), 64, 64));
                        break;*/
                }
            } else if (n instanceof DefaultNotification) {
                DefaultNotification nDN = (DefaultNotification) n;
                //nDto.setContent(nDN.getContent());

            }
            notificationsDto.add(nDto);
        }
        return notificationsDto;
    }

    public int getNotificationsUnseenCountByUserId(UserDetails userDetails) {
        return notificationRepository.countUnseenNotificationsByUserUsername(userDetails.getUsername());
    }

    public NotificationDto sendFriendshipSolicitationResponseNotification(Friendship friendship) {

        //User receiver = userRepository.findById(receiverId).get();
        User sender = friendship.getFriend();

        FriendshipSolicitationNotification fSNotification = new FriendshipSolicitationNotification();
        fSNotification.setFriendship(friendship);
        fSNotification.setDate(LocalDateTime.now());
        fSNotification.setViewed(false);
        fSNotification.setUser(friendship.getUser());
        //receiver.addNotification(fSNotification);

        //receiver.addFriendship(friendship);
        //sender.addFriendship(friendship);

        /*userRepository.save(receiver);
        userRepository.save(sender);*/
        fSNotification = notificationRepository.save(fSNotification);

        long senderId = sender.getId();
        return NotificationDto.builder()
                .id(fSNotification.getId())
                .friendshipId(friendship.getId())
                .viewed(fSNotification.isViewed())
                .senderId(sender.getId())
                .receiverId(friendship.getUser().getId())
                .senderUsername(sender.getUsername())
                //.senderProfilePicture(imageService.getFormattedProfilePictureById(senderId, 64, 64))
                  .senderProfilePicture(imageService.getFormattedProfilePictureById(senderId, 64, 64))
                .date(fSNotification.getDate())
                .type(NotificationType.ACCEPTED)
                .build();
    }

    @Transactional
    public boolean deleteNotificationById(long notificationId) {
        Optional<Notification> notificationOp = notificationRepository.findById(notificationId);
        if (notificationOp.isEmpty()) return false;
        Notification notification = notificationOp.get();

        if (notification instanceof FriendshipSolicitationNotification) {
            Friendship f = ((FriendshipSolicitationNotification) notification).getFriendship();
            if (f.getStatus() == FriendshipStatus.REJECTED) {
                friendshipRepository.delete(f);
            }
        }
        notificationRepository.deleteById(notificationId);
        return true;
    }


    public long getFriendshipNotificationIdByUsers(long user1Id, long user2Id){
        Optional<Long> friendshipId = friendshipRepository.getFriendshipIdByUsers(user1Id, user2Id);
        return friendshipSolicitationNotificationRepository.getFriendshipNotificationIdByFriendshipId(friendshipId.get());
    }


}
