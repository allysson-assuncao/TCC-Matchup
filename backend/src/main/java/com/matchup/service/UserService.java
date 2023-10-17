package com.matchup.service;

/*import com.matchup.config.JavaMailSender;*/
import com.matchup.dto.UserDto;
import com.matchup.model.*;
import com.matchup.model.image.ProfilePicture;
import com.matchup.repository.*;
import com.matchup.repository.image.ProfilePictureRepository;
import com.matchup.tools.BlobMultipartFile;
import com.matchup.tools.ImageResizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final InterestRepository interestRepository;

    private final com.matchup.repository.image.ProfilePictureRepository ProfilePictureRepository;

    private final FriendshipService friendshipService;

    private final BlockRepository blockRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ProfilePictureRepository ProfilePictureRepository, InterestRepository interestRepository, FriendshipService friendshipService, BlockRepository blockRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.interestRepository = interestRepository;
        this.ProfilePictureRepository = ProfilePictureRepository;
        this.friendshipService = friendshipService;
        this.blockRepository = blockRepository;
    }

    public User saveUser(User userToSave){
        //requires password verification
        return userRepository.save(userToSave);
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    @Transactional
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Transactional
    public Optional<User> findByEmailAndHashedPassword(UserDto userDto){
        Optional<User> user = userRepository.findByEmail(userDto.getEmail());

        if(user.isEmpty()){
            user = userRepository.findByUsername(userDto.getUsername());
        }
        if(user.isPresent() && !passwordEncoder.matches(userDto.getRawPassword(), user.get().getHashedPassword())){
            user = null;
        }
        //System.out.println(passwordEncoder.matches(userDto.getRawPassword(), user.get().getHashedPassword()));
        return user;
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public boolean verifyDate(LocalDate date){
        LocalDate now = LocalDate.now();
        LocalDate minDate = now.minusYears(120);
        LocalDate maxDate = now.minusYears(13);
        return date.isAfter(minDate) && date.isBefore(maxDate);
    }

    public User registerUser(UserDto userDto){
        User userToRegister = new User();
        Address addressToRegister = new Address();

        userToRegister.setName(userDto.getName());
        userToRegister.setUsername(userDto.getUsername());
        userToRegister.setEmail(userDto.getEmail());
        userToRegister.setBirthDate(userDto.getBirthDate());
        userToRegister.setHashedPassword(
                passwordEncoder.encode(userDto.getRawPassword()));
        //userToRegister.setCellphoneNumber(userDto.getCellphoneNumber());
        //userToRegister.setProfilePicture(userDto.getProfilePicture());
        userDto.getInterests().forEach(System.out::println);
        userToRegister.setInterests(
                interestRepository.findAllById(userDto.getInterests()));
        addressToRegister.setCity(userDto.getAddressCity());
        addressToRegister.setNumber(userDto.getAddressNumber());
        addressToRegister.setStreet(userDto.getAddressStreet());
        addressToRegister.setNeighborhood(userDto.getAddressNeighborhood());
        addressToRegister.setState(userDto.getAddressState());
        addressToRegister.setZipcode(userDto.getAddressZipcode());

        userToRegister.setAddress(addressToRegister);
        return userRepository.save(userToRegister);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public boolean verifyPassword(String password) {
        if (password.length() < 8 || password.length() > 255) {
            return false;
        }
        String pattern = "^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\\d]{8,255}$";
        return Pattern.matches(pattern, password);
    }

    public User updateUser(UserDto userDto){
        Optional<User> userToUpdateOp = userRepository.findById(userDto.getId());
        if(userToUpdateOp.isEmpty()) return null;
        User userToUpdate = userToUpdateOp.get();

        ProfilePicture profilePicture = null;
        if(userDto.getProfilePicture() != null){
            profilePicture = new ProfilePicture();
            try {
                profilePicture.setContent(userDto.getProfilePicture().getBytes());
            } catch (IOException e) {
                System.out
                        .println("updateUser() -> IOException");
                throw new RuntimeException(e);
            }
            profilePicture.setName(userDto.getProfilePicture().getName());
            profilePicture.setContentType(userDto.getProfilePicture().getContentType());
            profilePicture.setOriginalName(userDto.getProfilePicture().getOriginalFilename());
            profilePicture = ProfilePictureRepository.save(profilePicture);
            if(userToUpdate.getProfilePicture() != null){
                ProfilePictureRepository.deleteById(userToUpdate.getProfilePicture().getId());
            }
            profilePicture.setUser(userToUpdate);
            ProfilePictureRepository.save(profilePicture);
        }

        if(userDto.getUsername() != null){
            userToUpdate.setUsername(userDto.getUsername());
        }
        if(userDto.getBio() != null){
            userToUpdate.setBio(userDto.getBio());
        }
        System.out.println(userDto.getCellphoneNumber());
        if(userDto.getCellphoneNumber() != null){
            userToUpdate.setCellphoneNumber(userDto.getCellphoneNumber());
        }

        return userRepository.save(userToUpdate);
    }

    public User updateUserPassword(Long id, String rawPassword){
        Optional<User> userToUpdateOp = userRepository.findById(id);
        if(userToUpdateOp.isEmpty()) return null;
        User userToUpdate = userToUpdateOp.get();
        userToUpdate.setHashedPassword(passwordEncoder.encode(rawPassword));
        return userRepository.save(userToUpdate);
    }

    @Transactional(readOnly = true)
    public byte[] getProfilePictureById(long userId, int width, int height){
        Optional<ProfilePicture> ProfilePictureOp = ProfilePictureRepository.findByUserId(userId);
        if(ProfilePictureOp.isEmpty()) return null;
        ProfilePicture img = ProfilePictureOp.get();
        MultipartFile multipartFile = new BlobMultipartFile(img.getContent(), img.getName(), img.getOriginalName(), img.getContentType());

        try {
            img.setContent(ImageResizer.resizeImage(multipartFile, width, height));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return img.getContent();
    }

    @Transactional
    public boolean blockUserByBlockerIdAndBlockedId(Long blockerId, Long blockedId){
        if(blockRepository.existsByBlockedIdAndBlockerId(blockedId, blockerId)) return false;
        Optional<User> userBlockerOp = userRepository.findById(blockerId);
        Optional<User> userBlockedOp = userRepository.findById(blockedId);
        if(userBlockerOp.isEmpty()) return false;
        User userBlocker = userBlockerOp.get();
        if(userBlockedOp.isEmpty()) return false;
        User userBlocked = userBlockedOp.get();
        if(friendshipService.existsFriendshipByUsersId(blockerId, blockedId)) {
            friendshipService.endFriendship(blockerId, blockedId);
        }
        Block block = new Block(userBlocker, userBlocked);
        blockRepository.save(block);

        for(Block block1: userRepository.findById(blockerId).get().getBlockList()){
            System.out.println(block1.getBlocker().getId());
        }

        return true;
    }

    public boolean unblockUserByBlockerIdAndBlockedId(Long blockerId, Long blockedId){
        blockRepository.deleteByBlockerIdAndBlockedId(blockerId, blockedId);
        return true;
    }

    public List<Long> getBlockerIdListByBlockedId(Long userId){
        return blockRepository.findBlockerIdListByBlockedId(userId);
    }

    public List<Long> getBlockedIdListByBlockerId(Long userId){
        return blockRepository.findBlockedIdListByBlockerId(userId);
    }

    public boolean isBlockedBy(long blockedId, long blockerId){
        boolean response = blockRepository.existsByBlockedIdAndBlockerId(blockedId, blockerId);
        System.out.println(response);
        return response;
    }



}
