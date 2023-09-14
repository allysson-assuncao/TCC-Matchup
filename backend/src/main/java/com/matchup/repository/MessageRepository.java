package com.matchup.repository;

import com.matchup.model.Message;
import com.matchup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    /*@Query("SELECT m FROM Message m WHERE m.date LIKE %:date%")
    List<Message> findByPartOfTheDate(@Param("date") String partOfTheDate);*/
    List<Message> findByExtension(String extension);
    List<Message> findBySender(User sender);

    List<Message> findByReceiver(User receiver);

}
