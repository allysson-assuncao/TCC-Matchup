package com.matchup.repository;

import com.matchup.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(long id);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    /*Set<User> findBlockListById(long id);*/

    @Query("SELECT u.blockList FROM User u WHERE u.id = :userId")
    Set<User> findBlockedUsersById(@Param("userId") Long userId);

    @Transactional
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

}
