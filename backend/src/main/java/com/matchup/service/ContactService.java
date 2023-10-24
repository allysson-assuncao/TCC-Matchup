package com.matchup.service;

import com.matchup.dto.ContactDto;
import com.matchup.dto.MessageDto;
import com.matchup.model.Contact;
import com.matchup.model.message.AudioMessage;
import com.matchup.model.message.ImageMessage;
import com.matchup.model.message.Message;
import com.matchup.model.message.TextMessage;
import com.matchup.repository.ContactRepository;
import com.matchup.repository.message.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    private final MessageRepository messageRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository, MessageRepository messageRepository) {
        this.contactRepository = contactRepository;
        this.messageRepository = messageRepository;
    }

    public List<ContactDto> getContactsByUser1Id(long user1Id) {
        if (contactRepository.findContactsByUser1Id(user1Id).isEmpty()) return null;
        List<Contact> contactList = contactRepository.findContactsByUser1Id(user1Id).get();
        List<ContactDto> contactDtoList = null;
        List<Message> messageList;
        List<MessageDto> messageDtoList = null;
        for (Contact contact : contactList) {
            ContactDto contactDto = new ContactDto();
            contactDto.setId(contact.getId());
            contactDto.setUser1Id(contact.getUser1().getId());
            contactDto.setUser2Id(contact.getUser2().getId());
            contactDto.setDisplayed(contact.isDisplayed());
            contactDto.setUser2Username(contact.getUser2().getUsername());
            messageList = messageRepository.findMessagesBySenderIdAndReceiverId(contactDto.getUser1Id(), contactDto.getUser2Id()).get();
            for (Message message : messageList) {
                MessageDto messageDto = new MessageDto();
                messageDto.setId(message.getId());
                messageDto.setDate(message.getDate());
                messageDto.setSenderId(message.getSender().getId());
                /*messageDto.setViewed(message.get);*/ //requires smt
                /*messageDto.setMessageType(message.get);*/ //set message type
                switch (messageDto.getMessageType()){
                    case TEXT -> {
                        TextMessage textMessage = (TextMessage) message;
                        messageDto.setHashedText(textMessage.getHashedText());
                    }
                    case AUDIO -> {
                        AudioMessage audioMessage = (AudioMessage) message;
                        messageDto.setHashedAudio(audioMessage.getHashedAudio().getHashedAudio().toString());
                    }
                    case IMAGE -> {
                        ImageMessage imageMessage = (ImageMessage) message;
                        /*messageDto.setHashedImage(imageMessage.getHashedImage());*/ //requires convertion
                    }
                }
            }
            contactDto.setMessages(messageDtoList);
            contactDtoList.add(contactDto);
        }

        return contactDtoList;

    }

}
