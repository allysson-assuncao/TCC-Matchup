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

    @Transactional
    Optional<User> findByEmail(String email);

    /*@Query("SELECT u.access, u.bio, u.birthDate, u.receivedMessages, u.sentMessages, u.email" +
            ", u.address, u.blockList, u.codes, u.friends, u.cellphoneNumber, u.id, u.hashedPassword, " +
            "u.email, u.name, u.username, u.notifications, u.interests, u.profilePicture FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);*/

    @Transactional
    Optional<User> findByUsername(String username);

    /*@Query("SELECT u.access, u.bio, u.birthDate, u.receivedMessages, u.sentMessages, u.email" +
            ", u.address, u.blockList, u.codes, u.friends, u.cellphoneNumber, u.id, u.hashedPassword, " +
            "u.email, u.name, u.username, u.notifications, u.interests, u.profilePicture FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(@Param("username") String username);*/

    /*Set<User> findBlockListById(long id);*/

    @Query("SELECT u.blockList FROM User u WHERE u.id = :userId")
    Set<User> findBlockedUsersById(@Param("userId") Long userId);

    @Transactional
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

}
