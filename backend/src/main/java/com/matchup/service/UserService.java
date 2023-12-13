package com.matchup.service;

/*import com.matchup.config.JavaMailSender;*/
import com.fasterxml.jackson.databind.ObjectMapper;
import com.matchup.dto.UserDto;
import com.matchup.dto.auth.AuthenticationRequest;
import com.matchup.dto.auth.AuthenticationResponse;
import com.matchup.dto.auth.RegisterRequest;
import com.matchup.enums.TokenType;
import com.matchup.enums.UserAccess;
import com.matchup.model.*;
import com.matchup.model.image.ProfilePicture;
import com.matchup.model.User;
import com.matchup.repository.*;
import com.matchup.repository.image.ProfilePictureRepository;
import com.matchup.repository.UserRepository;
import com.matchup.tools.BlobMultipartFile;
import com.matchup.tools.ImageResizer;
import com.matchup.config.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
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
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final InterestRepository interestRepository;

    private final com.matchup.repository.image.ProfilePictureRepository ProfilePictureRepository;

    private final FriendshipService friendshipService;

    private final BlockRepository blockRepository;

    private final PasswordEncoder passwordEncoder;

    private final TokenRepository tokenRepository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, InterestRepository interestRepository, com.matchup.repository.image.ProfilePictureRepository profilePictureRepository, FriendshipService friendshipService, BlockRepository blockRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.interestRepository = interestRepository;
        ProfilePictureRepository = profilePictureRepository;
        this.friendshipService = friendshipService;
        this.blockRepository = blockRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
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

        userToRegister.setAccess(UserAccess.DEFAULT);
        userToRegister.setName(userDto.getName());
        userToRegister.setUsername(userDto.getUsername());
        userToRegister.setEmail(userDto.getEmail());
        userToRegister.setBirthDate(userDto.getBirthDate());
        userToRegister.setHashedPassword(
                passwordEncoder.encode(userDto.getRawPassword()));
        //userToRegister.setCellphoneNumber(userDto.getCellphoneNumber());
        //userToRegister.setProfilePicture(userDto.getProfilePicture());
        //userDto.getInterests().forEach(System.out::println);
       /* userToRegister.setInterests(
                interestRepository.findAllById(userDto.getInterests()));*/
        addressToRegister.setCity(userDto.getAddressCity());
        addressToRegister.setNumber(userDto.getAddressNumber());
        addressToRegister.setStreet(userDto.getAddressStreet());
        addressToRegister.setNeighborhood(userDto.getAddressNeighborhood());
        addressToRegister.setState(userDto.getAddressState());
        addressToRegister.setZipcode(userDto.getAddressZipcode());

        userToRegister.setAddress(addressToRegister);
        return userRepository.save(userToRegister);
    }

    public boolean linkInterestToUser(Long userId, Long interestId) {
        Optional<User> userOp = userRepository.findById(userId);
        Optional<Interest> interestOp = interestRepository.findById(interestId);
        if(userOp.isEmpty() || interestOp.isEmpty()) return false;

        User user = userOp.get();
        Interest interest = interestOp.get();
        user.addInterest(interest);
        interest.addUser(user);
        userRepository.save(user);
        interestRepository.save(interest);
        return true;
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

    public User updateUser(UserDto userDto, UserDetails userDetails){
        Optional<User> userToUpdateOp = userRepository.findByUsername(userDetails.getUsername());
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













    public AuthenticationResponse register(RegisterRequest request) {

        var user = User.builder()
                .name(request.getName())
                .birthDate(request.getBirthDate())
                .access(UserAccess.DEFAULT)
                .username(request.getUsername())
                .email(request.getEmail())
                .hashedPassword(passwordEncoder.encode(request.getRawPassword()))
                .address(Address.builder()
                        .number(request.getAddressNumber())
                        .street(request.getAddressStreet())
                        .neighborhood(request.getAddressNeighborhood())
                        .city(request.getAddressCity())
                        .state(request.getAddressState())
                        .zipcode(request.getAddressZipcode()).build())
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .build();
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        boolean isEmail = request.getEmail() != null;

        User user;
        if(isEmail){
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getRawPassword()
                    )
            );
            user = userRepository.findByEmail(request.getEmail()).get();
        }else {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getRawPassword()
                    )
            );
            user = userRepository.findByUsername(request.getUsername()).get();
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    public User getUserByUsername(String username){
        Optional<User> userOp = userRepository.findByUsername(username);
        if(userOp.isEmpty()) return null;
        return userOp.get();
    }

}
