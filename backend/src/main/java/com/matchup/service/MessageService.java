package com.matchup.service;

import com.matchup.model.message.Message;
import com.matchup.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository){this.messageRepository = messageRepository;}

}
