package com.matchup.repository.message;

import com.matchup.model.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :user1Id AND m.receiver.id = :user2Id) OR (m.sender.id = :user2Id AND m.receiver.id = :user1Id) ORDER BY m.date DESC")
    Optional<List<Message>> findMessagesBySenderIdAndReceiverId(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);



    /*@Query(value = "SELECT m FROM Message m WHERE (m.sender.id = :user1Id AND m.receiver.id = :user2Id) " +
            "OR (m.sender.id = :user2Id AND m.receiver.id = :user1Id) ORDER BY m.date DESC")*/
    /*@Query("SELECT m FROM Message m WHERE m.date = (SELECT MAX(m2.date) FROM Message m2 " +
            "WHERE (m2.sender.id = :user1Id AND m.receiver.id = :user2Id) OR (m2.sender.id = :user2Id AND m.receiver.id = :user1Id))")
    Optional<Message> findLastMessageByUser1IdAndUser2Id(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);*/

    @Query(value = "SELECT m FROM Message m WHERE (m.sender.id = :user1Id AND m.receiver.id = :user2Id) " +
            "OR (m.sender.id = :user2Id AND m.receiver.id = :user1Id) ORDER BY m.date DESC LIMIT 1")
    Optional<Message> findLastMessageByUser1IdAndUser2Id(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver.username = :receiverUsername " +
            "AND m.sender.username = :senderUsername AND m.viewed = false")
    int countUnreadMessagesByReceiverAndSenderUsernames(@Param("receiverUsername") String receiverUsername, @Param("senderUsername") String senderUsername);

}
