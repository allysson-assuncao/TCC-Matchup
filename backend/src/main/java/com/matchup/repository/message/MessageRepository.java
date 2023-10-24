package com.matchup.repository.message;

import com.matchup.model.Friendship;
import com.matchup.model.message.Message;
import com.matchup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :user1Id AND m.receiver.id = :user2Id) OR (m.sender.id = :user2Id AND m.receiver.id = :user1Id)")
    Optional<List<Message>> findMessagesBySenderIdAndReceiverId(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

}
