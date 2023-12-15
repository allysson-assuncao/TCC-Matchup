package com.matchup.service;

import com.matchup.dto.FriendDto;
import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.model.User;
import com.matchup.repository.FriendshipRepository;
import com.matchup.repository.UserRepository;
import com.matchup.repository.notification.FriendshipSolicitationNotificationRepository;
import com.matchup.repository.notification.NotificationRepository;
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

    private final UserService userService;

    private final NotificationRepository notificationRepository;

    private final NotificationService notificationService;

    private final FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository, NotificationRepository notificationRepository, NotificationService notificationService, FriendshipSolicitationNotificationRepository friendshipSolicitationNotificationRepository, UserRepository userRepository, UserService userService) {
        this.friendshipRepository = friendshipRepository;
        this.notificationRepository = notificationRepository;
        this.notificationService = notificationService;
        this.friendshipSolicitationNotificationRepository = friendshipSolicitationNotificationRepository;
        this.userRepository = userRepository;
        this.userService = userService;
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
        notificationService.sendFriendshipSolicitationResponseNotification(friendship.getId());
        return true;

    }

    public boolean existsFriendshipByUsersId(Long user1Id, Long user2Id) {
        return friendshipRepository.existsByUsers(user1Id, user2Id);
    }

    @Transactional
    public Friendship getFriendship(Long user1Id, Long user2Id) {
        System.out.println(friendshipRepository.existsByUsers(user1Id, user2Id) + "  " + user1Id + "  " + user2Id);
        if(!friendshipRepository.existsByUsers(user1Id, user2Id)) return null;
        return friendshipRepository.findByUsers(user1Id, user2Id).get();
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


    public List<FriendDto> getFriendsByUserId(UserDetails userDetails){
        Optional<User> userOp = userRepository.findByUsername(userDetails.getUsername());
        if(userOp.isEmpty()) return null;
        List<Object[]> friendsFromDB = friendshipRepository.findFriendsByUserId(userOp.get().getId());

        List<FriendDto> friends = new ArrayList<>();
        for (Object[] o : friendsFromDB){
            FriendDto newFriend = null;
            try {
                newFriend = new FriendDto((Long) o[0] , o[1]+"",
                        "data:image/png;base64," + String.valueOf(userService.getProfilePictureById(o[1] + "", 128, 128).getFile().getBytes()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            friends.add(newFriend);
        }

        return friends;
    }

}
