package com.matchup.service;

import com.matchup.model.User;
import com.matchup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class NotificationService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final NotificationRepository notificationRepository;


    @Autowired
    public NotificationService(UserRepository userRepository, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    public User saveUser(User userToSave) {
        //requires password verification
        return userRepository.save(userToSave);
    }
}
