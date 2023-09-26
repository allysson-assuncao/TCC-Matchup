package com.matchup.service;

import com.matchup.config.JavaMailSender;
import com.matchup.dto.UserDto;
import com.matchup.exceptions.InvalidCodeException;
import com.matchup.model.Address;
import com.matchup.model.ProfilePicture;
import com.matchup.model.User;
import com.matchup.model.VerificationCode;
import com.matchup.repository.InterestRepository;
import com.matchup.repository.ProfilePictureRepository;
import com.matchup.repository.UserRepository;
import com.matchup.repository.VerificationCodeRepository;
import com.matchup.tools.BlobMultipartFile;
import com.sun.jdi.InvalidCodeIndexException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final InterestRepository interestRepository;
    private final ProfilePictureRepository profilePictureRepository;
    private final VerificationCodeRepository verificationCodeRepository;

    private final PasswordEncoder passwordEncoder;

    private boolean isValid = true;
    private String code = "";
    private Long id;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ProfilePictureRepository profilePictureRepository, InterestRepository interestRepository, VerificationCodeRepository verificationCodeRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.interestRepository = interestRepository;
        this.profilePictureRepository = profilePictureRepository;
        this.verificationCodeRepository = verificationCodeRepository;
    }

    public User saveUser(User userToSave){
        //requires password verification
        return userRepository.save(userToSave);
    }

    /*public User findById(Long id){
        //public User(String name, String email, LocalDateTime age, String hashedPassword, String cellphoneNumber, Byte[] profilePicture, Address
        //address)
        return userRepository.findById(id).get();
    }*/

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    @Transactional
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }


    public List<User> findByPartOfTheName(String partOfTheName){
        return userRepository.findByNameContainingIgnoreCase(partOfTheName);
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

//    public boolean existsByEmailOrUsername(String email, String username){
//        return userRepository.existsByEmailOrUsername(email, username);
//    }

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

    public Boolean sendCode(String email){
        System.out.println("Send code: " + email);
        System.out.println("Valid email? " + userRepository.existsByEmail(email));
        System.out.println("Usuário do email: " + userRepository.findByEmail(email));
        code = "";
        if (userRepository.existsByEmail(email)){
            System.out.println("existsByEmail(email) = " + existsByEmail(email));
            if (findByEmail(email).isPresent()){
                System.out.println("Email cadastrado!");
                Optional<User> userID = findByEmail(email);
                id = userID.get().getId();
            }else {
                System.out.println("Email não cadastrado!");
                return false;
            }
            Random generator = new Random();
            int codes;
            for(int i = 0; i < 6; i++){
                codes = generator.nextInt(10);
                code += codes + "";
            }
            Thread invalidateCodeThread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(120000); // Waits 2 minutes (120000 miliseconds)
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    isValid = false;
                    System.out.println("O código de verificação expirou!");
                }
            });
            invalidateCodeThread.start();
            //send email

            System.out.println("Código: " + code);
            return true;
        }else{
            return false;
        }
    }

    public boolean verifyCode(String inputCode) throws InvalidCodeException {
        System.out.println("Código a ser verificado: " + code);
        if (inputCode.length() != 6) {
            throw new InvalidCodeException();
        }
        for (int i = 0; i < inputCode.length(); i++) {
            if (!Character.isDigit(inputCode.charAt(i))) {
                throw new InvalidCodeException();
            }
        }
        return inputCode.equals(code) && isValid;
    }

    public boolean verifyPassword(String password) {
        if (password.length() < 8 || password.length() > 255) {
            return false;
        }
        String pattern = "^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\\d]{8,255}$";
        return Pattern.matches(pattern, password);
    }

    public boolean resetPassword(String rawPassword) {
        //must encode password first
        return userRepository.updatePassword(id, rawPassword);
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
                System.out.println("updateUser() -> IOException");
                throw new RuntimeException(e);
            }
            profilePicture.setName(userDto.getProfilePicture().getName());
            profilePicture.setContentType(userDto.getProfilePicture().getContentType());
            profilePicture.setOriginalName(userDto.getProfilePicture().getOriginalFilename());
            profilePictureRepository.save(profilePicture);
        }
        userToUpdate.updateData(userDto, profilePicture);
        profilePicture.setUser(userToUpdate);
        return userRepository.save(userToUpdate);
    }

    @Transactional
    public byte[] getProfilePictureById(long userId){
        Optional<ProfilePicture> profilePictureOp = profilePictureRepository.findByUserId(userId);
        if(profilePictureOp.isEmpty()) return null;
        ProfilePicture img = profilePictureOp.get();
        MultipartFile multipartFile = new BlobMultipartFile(img.getContent(), img.getName(), img.getOriginalName(), img.getContentType());
        return img.getContent();
    }

}
