package com.matchup.repository;

import com.matchup.model.Friendship;
import com.matchup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    List<Friendship> findById(long id);

    List<Friendship> findByStatus(String status);

    /*@Query("SELECT f FROM Friendship f WHERE f.date LIKE %:date%")
    List<Friendship> findByPartOfTheDate(@Param("date") String partOfTheDate);*/

    List<Friendship> findByUser(User user);

    List<Friendship> findByFriend(User user);

}
