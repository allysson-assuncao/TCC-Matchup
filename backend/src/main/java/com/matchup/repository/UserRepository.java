package com.matchup.repository;

import com.matchup.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Transactional
    @Query("update User u set u.hashedPassword = :hashedPassword where u.id = :id")
    boolean updatePassword(@Param("id") Long id, @Param("hashedPassword") String hashedPassword);

    Optional<User> findById(long id);

    Optional<User> findByEmailAndHashedPassword(String email, String hashedPassword);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByHashedPassword(String hashedPassword);

    List<User> findByName(String name);
    //List<Address> findByNumber(int number);

    /*@Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE %LOWER(:name)%")
    List<User> findByPartOfTheName(@Param("name") String partOfTheName);*/

    List<User> findByNameContainingIgnoreCase(String partOfTheName);

    @Query("SELECT u FROM User u WHERE u.cellphoneNumber LIKE %:cellphoneNumber%")
    List<User> findByPartOfTheCellphoneNumber(@Param("cellphoneNumber") String partOfTheCellphoneNumber);

    @Transactional
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
//    boolean existsByEmailOrUsername(String email, String username);

}
