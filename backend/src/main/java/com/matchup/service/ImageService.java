package com.matchup.service;

import com.matchup.dto.MultiPartFileDto;
import com.matchup.model.Friendship;
import com.matchup.model.User;
import com.matchup.model.image.ProfilePicture;
import com.matchup.repository.FriendshipRepository;
import com.matchup.repository.UserRepository;
import com.matchup.repository.image.ProfilePictureRepository;
import com.matchup.repository.notification.FriendshipSolicitationNotificationRepository;
import com.matchup.repository.notification.NotificationRepository;
import com.matchup.tools.BlobMultipartFile;
import com.matchup.tools.ImageResizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Service
public class ImageService {

    private final UserRepository userRepository;

    private final ProfilePictureRepository profilePictureRepository;

    @Autowired
    public ImageService(UserRepository userRepository, ProfilePictureRepository profilePictureRepository) {
        this.profilePictureRepository = profilePictureRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public MultiPartFileDto getProfilePictureByUsername(String username, int width, int height){
        Optional<User> userOp = userRepository.findByUsername(username);
        if(userOp.isEmpty()) return null;
        Optional<ProfilePicture> ProfilePictureOp = profilePictureRepository.findByUserId(userOp.get().getId());
        if(ProfilePictureOp.isEmpty()) return null;
        ProfilePicture img = ProfilePictureOp.get();
        try {
            img.setContent(ImageResizer.resizeImage(img.getContent(), width, height));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        MultipartFile multipartFile = new BlobMultipartFile(img.getContent(), img.getName(), img.getOriginalName(), img.getContentType());
        MultiPartFileDto multiPartFileDto = new MultiPartFileDto(multipartFile);

        return multiPartFileDto;
    }

    @Transactional(readOnly = true)
    public String getFormattedProfilePictureById(Long id, int width, int height){

        Optional<ProfilePicture> ProfilePictureOp = profilePictureRepository.findByUserId(id);
        if(ProfilePictureOp.isEmpty()) return "";

        ProfilePicture profilePicture = ProfilePictureOp.get();
        try {
            byte[] img = ImageResizer.resizeImage(profilePicture.getContent(), width, height);
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(img);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
