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

    private final AudioMessageRepository audioMessageRepository;

    private final ImageMessageRepository imageMessageRepository;

    private final TextMessageRepository textMessageRepository;

    private final TextRepository textRepository;

    private final AudioRepository audioRepository;

    private final MessageImageRepository messageImageRepository;

    private final ContactRepository contactRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, AudioMessageRepository audioMessageRepository, ImageMessageRepository imageMessageRepository, TextMessageRepository textMessageRepository, TextRepository textRepository, AudioRepository audioRepository, MessageImageRepository messageImageRepository, ContactRepository contactRepository) {
        this.messageRepository = messageRepository;
        this.audioMessageRepository = audioMessageRepository;
        this.imageMessageRepository = imageMessageRepository;
        this.textMessageRepository = textMessageRepository;
        this.textRepository = textRepository;
        this.audioRepository = audioRepository;
        this.messageImageRepository = messageImageRepository;
        this.contactRepository = contactRepository;
    }

    public MessageDto sendMessage(MessageDto messageDto){
        return null;
    }



}
