package com.matchup.service;

import com.matchup.dto.MessageDto;
import com.matchup.repository.ContactRepository;
import com.matchup.repository.image.MessageImageRepository;
import com.matchup.repository.message.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository){this.messageRepository = messageRepository;}

}
