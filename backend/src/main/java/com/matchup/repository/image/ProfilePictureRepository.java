package com.matchup.repository.image;

import com.matchup.model.image.ImageModel;
import com.matchup.model.image.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

    Optional<ProfilePicture> findById(long id);

    Optional<ProfilePicture> findByUserId(long id);

    void deleteById(long id);

    void deleteByUserId(long id);
}
