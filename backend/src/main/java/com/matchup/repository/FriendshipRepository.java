package com.matchup.repository;

import com.matchup.model.Friendship;
import com.matchup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    List<Friendship> findById(long id);

}
