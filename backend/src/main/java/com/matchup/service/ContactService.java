package com.matchup.service;

import com.matchup.dto.ContactDto;
import com.matchup.dto.MessageDto;
import com.matchup.enums.MessageType;
import com.matchup.model.Contact;
import com.matchup.model.message.AudioMessage;
import com.matchup.model.message.ImageMessage;
import com.matchup.model.message.Message;
import com.matchup.model.message.TextMessage;
import com.matchup.repository.ContactRepository;
import com.matchup.repository.message.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {

    public static final int MESSAGE_LIMIT = 50;

    private final ContactRepository contactRepository;

    private final MessageRepository messageRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository, MessageRepository messageRepository) {
        this.contactRepository = contactRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional
    public List<ContactDto> getContactsByUser1Id(long user1Id) {
        /*if (contactRepository.findContactsByUser1Id(user1Id).isEmpty()) return null;*/
        List<Contact> contactList = contactRepository.findContactsByUser1Id(user1Id).get();
        List<ContactDto> contactDtoList = new ArrayList<>();
        List<Message> messageList;
        List<MessageDto> messageDtoList = new ArrayList<>();
        for (Contact contact : contactList) {
            ContactDto contactDto = new ContactDto();
            contactDto.setId(contact.getId());
            contactDto.setUser1Id(contact.getUser1().getId());
            contactDto.setUser2Id(contact.getUser2().getId());
            contactDto.setDisplayed(contact.isDisplayed());
            contactDto.setUser2Username(contact.getUser2().getUsername());
            messageList = messageRepository.findMessagesBySenderIdAndReceiverId(contactDto.getUser1Id(), contactDto.getUser2Id()).get();
            //setting message limit
            messageList = messageList.stream().limit(MESSAGE_LIMIT).collect(Collectors.toList());
            System.out.println(messageList);
            System.out.println("OOOOOOOOOOOOOOOOOOOOOOOOOOOO MORA NUM ABAXI EMBAIXO DO MAR, BOB ESPONJA, CALÇA QUADRADA!");
            for (Message message : messageList) {
                MessageDto messageDto = new MessageDto();
                messageDto.setId(message.getId());
                messageDto.setDate(message.getDate());
                messageDto.setSenderId(message.getSender().getId());
                messageDto.setViewed(message.isViewed());
                String messageType = message.getClass().getSimpleName();

                switch (messageType) {
                    case "TextMessage" -> {
                        messageDto.setMessageType(MessageType.TEXT);
                        TextMessage textMessage = (TextMessage) message;
                        messageDto.setHashedText(textMessage.getHashedText());
                    }
                    case "AudioMessage" -> {
                        messageDto.setMessageType(MessageType.AUDIO);
                        AudioMessage audioMessage = (AudioMessage) message;
                        messageDto.setHashedAudio(audioMessage.getHashedAudio().getHashedAudio().toString());
                    }
                    case "ImageMessage" -> {
                        messageDto.setMessageType(MessageType.IMAGE);
                        ImageMessage imageMessage = (ImageMessage) message;
                        //messageDto.setHashedImage(imageMessage.getHashedImage()); //requires convertion
                    }
                    default -> {
                        System.out.println("Tipo de mensagem desconhecido: " + messageType);
                    }
                }
                messageDtoList.add(messageDto);
            }
            contactDto.setMessages(messageDtoList);
            contactDtoList.add(contactDto);
        }
        System.out.println(contactList);
        System.out.println("contactdto:" + contactDtoList);
        return contactDtoList;

    }

}
