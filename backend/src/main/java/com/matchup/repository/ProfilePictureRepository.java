package com.matchup.repository;

import com.matchup.model.ProfilePicture;
import com.matchup.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

    Optional<ProfilePicture> findById(long id);

    Optional<ProfilePicture> findByUserId(long id);

    void deleteById(long id);

}
