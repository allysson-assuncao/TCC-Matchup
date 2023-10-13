package com.matchup.repository.notification;

import com.matchup.model.User;
import com.matchup.model.notification.FriendshipSolicitationNotification;
import com.matchup.model.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface FriendshipSolicitationNotificationRepository extends JpaRepository<FriendshipSolicitationNotification, Long> {
    @Transactional
    void deleteByFriendshipId(long friendshipId);
}
