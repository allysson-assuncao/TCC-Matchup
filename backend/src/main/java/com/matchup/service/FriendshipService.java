package com.matchup.service;

import com.matchup.dto.FriendDto;
import com.matchup.dto.NotificationDto;
import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.model.User;
import com.matchup.repository.FriendshipRepository;
import com.matchup.repository.UserRepository;
import com.matchup.repository.notification.FriendshipSolicitationNotificationRepository;
import com.matchup.repository.notification.NotificationRepository;
import org.hibernate.event.spi.SaveOrUpdateEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;

    private final UserRepository userRepository;

    private final ImageService imageService;

    private final NotificationRepository notificationRepository;

    private final NotificationService notificationService;

    private final FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository;

    @Autowired
    public FriendshipService(ImageService imageService, FriendshipRepository friendshipRepository, NotificationRepository notificationRepository, NotificationService notificationService, FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository, UserRepository userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.notificationRepository = notificationRepository;
        this.notificationService = notificationService;
        this.friendshipSolicitationNotificationRepository = friendshipSolicitationNotificationRepository;
        this.userRepository = userRepository;
        this.imageService = imageService;
    }

    public Friendship saveFriendship(Friendship friendshipToSave) {
        return friendshipRepository.save(friendshipToSave);
    }


    public NotificationDto sendFriendshipSolicitationResponseNotification(long receiverId, long senderId, boolean accepted) {
        if (senderId == receiverId) return null;

        Optional<Friendship> friendshipOp = friendshipRepository.findByUsers(senderId, receiverId);
        if (friendshipOp.isEmpty()) return null;
        Friendship friendship = friendshipOp.get();

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendship.getId());

        if (accepted) {
            friendship.setStatus(FriendshipStatus.ACCEPTED);
        } else {
            endFriendship(receiverId, senderId);
            return null;
        }
        friendship.setDate(LocalDateTime.now());
        friendship = saveFriendship(friendship);

        return notificationService.sendFriendshipSolicitationResponseNotification(friendship);

    }

    /*public NotificationDto sendFriendshipSolicitationResponseNotification(long friendshipId, boolean accepted) {
        Optional<Friendship> friendshipOp = friendshipRepository.findById(friendshipId);
        if (friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        System.out.println(accepted);
        System.out.println(friendship.getUser().getUsername());
        if (accepted) {
            friendship.setStatus(FriendshipStatus.ACCEPTED);
        } else {
            friendship.setStatus(FriendshipStatus.REJECTED);
        }
        friendship.setDate(LocalDateTime.now());
        friendship = saveFriendship(friendship);

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendshipId);
        notificationService.sendFriendshipSolicitationResponseNotification(friendship.getId());
        return true;

    }*/

    public boolean existsFriendshipByUsersId(Long user1Id, Long user2Id) {
        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

    @Transactional
    public Friendship getFriendship(Long user1Id, Long user2Id) {
        System.out.println(friendshipRepository.existsByUsers(user1Id, user2Id) + "  " + user1Id + "  " + user2Id);
        if (!friendshipRepository.existsByUsers(user1Id, user2Id)) return null;
        return friendshipRepository.findByUsers(user1Id, user2Id).get();
    }

    @Transactional
    public boolean endFriendship(long user1Id, long user2Id) {
        Optional<Friendship> friendshipOp = friendshipRepository.findByUsers(user1Id, user2Id);
        if (friendshipOp.isEmpty()) return false;
        Friendship friendship = friendshipOp.get();

        friendshipSolicitationNotificationRepository.deleteByFriendshipId(friendship.getId());
        friendshipRepository.delete(friendship);
        return true;

    }


    public List<FriendDto> getFriendsByUserId(UserDetails userDetails) {
        Optional<User> userOp = userRepository.findByUsername(userDetails.getUsername());
        if (userOp.isEmpty()) return null;
        List<Object[]> friendsFromDB = friendshipRepository.findFriendsByUserId(userOp.get().getId());

        List<FriendDto> friends = new ArrayList<>();
        for (Object[] o : friendsFromDB) {
            FriendDto newFriend = null;

            newFriend = new FriendDto((Long) o[0], o[1] + "",
                    imageService.getFormattedProfilePictureById((Long) o[0], 128, 128));
            friends.add(newFriend);
        }

        return friends;
    }

}
