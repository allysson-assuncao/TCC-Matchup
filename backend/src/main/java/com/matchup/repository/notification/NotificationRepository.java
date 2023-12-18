package com.matchup.repository.notification;

import com.matchup.model.notification.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Optional<Notification> findById(long id);

    Optional<List<Notification>> findByUserId(long userId);


    /*@Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.viewed = TRUE WHERE n.user.id = :userId")
    void updateStatusToViewedByUserId(@Param("userId") Long userId);*/

    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.viewed = TRUE WHERE n.viewed = FALSE and n.user.id = :receiverId")
    void updateStatusToViewedByUserId(@Param("receiverId") Long receiverId);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.id = :userId AND n.viewed = false")
    int countUnseenNotificationsByUserId(@Param("userId") long userId);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.username = :receiverUsername AND n.viewed = false")
    int countUnseenNotificationsByUserUsername(@Param("receiverUsername")  String receiverUsername);
}
