package com.matchup.service;

import com.matchup.dto.ContactDto;
import com.matchup.dto.MessageDto;
import com.matchup.enums.MessageType;
import com.matchup.model.Contact;
import com.matchup.model.User;
import com.matchup.model.message.*;
import com.matchup.repository.ContactRepository;
import com.matchup.repository.UserRepository;
import com.matchup.repository.image.MessageImageRepository;
import com.matchup.repository.message.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageService {

    public static final int MESSAGE_LIMIT = 15;

    private final MessageRepository messageRepository;

    private final AudioMessageRepository audioMessageRepository;

    private final ImageMessageRepository imageMessageRepository;

    private final TextMessageRepository textMessageRepository;

    private final AudioRepository audioRepository;

    private final MessageImageRepository messageImageRepository;

    private final ContactRepository contactRepository;

    private final UserRepository userRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, AudioMessageRepository audioMessageRepository, ImageMessageRepository imageMessageRepository, TextMessageRepository textMessageRepository, AudioRepository audioRepository, MessageImageRepository messageImageRepository, ContactRepository contactRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.audioMessageRepository = audioMessageRepository;
        this.imageMessageRepository = imageMessageRepository;
        this.textMessageRepository = textMessageRepository;
        this.audioRepository = audioRepository;
        this.messageImageRepository = messageImageRepository;
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    @org.springframework.transaction.annotation.Transactional
    public MessageDto sendMessage(MessageDto messageDto) {
        Optional<User> receiverOp = userRepository.findById(messageDto.getReceiverId());
        if (receiverOp.isEmpty()) return null;
        Optional<User> senderOp = userRepository.findById(messageDto.getSenderId());
        if (senderOp.isEmpty()) return null;

        if (!contactRepository.existsByUser1IdAndUser2Id(senderOp.get().getId(), receiverOp.get().getId())) {
            Contact contact1 = new Contact();
            contact1.setDisplayed(true);
            contact1.setUser1(senderOp.get());
            contact1.setUser2(receiverOp.get());

            Contact contact2 = new Contact();
            contact2.setDisplayed(true);
            contact2.setUser1(receiverOp.get());
            contact2.setUser2(senderOp.get());

            contactRepository.save(contact1);
            contactRepository.save(contact2);
        }

        switch (messageDto.getMessageType()) {
            case "TEXT" -> {
                return sendTextMessage(messageDto, receiverOp.get(), senderOp.get());
            }
            case "AUDIO" -> {
                return /*sendAudioMessage(messageDto, receiverOp.get(), senderOp.get())*/ null;
            }
            case "IMAGE" -> {
                return /*sendImageMessage(messageDto, receiverOp.get(), senderOp.get())*/ null;
            }
            default -> {
                return null;
            }
        }

    }

    @Transactional
    @org.springframework.transaction.annotation.Transactional
    public List<MessageDto> findMessageListByUsersId(long user1Id, long user2Id) {
        Optional<User> user1Op = userRepository.findById(user1Id);
        if (user1Op.isEmpty()) return null;
        Optional<User> user2Op = userRepository.findById(user2Id);
        if (user1Op.isEmpty()) return null;

        if (!contactRepository.existsByUser1IdAndUser2Id(user1Id, user2Id)) {
            return null;
        }

        Contact contact = contactRepository.findByUser1IdAndUser2Id(user1Id, user2Id).get();

        if (!contact.isDisplayed()) contact.setDisplayed(false);

        List<Message> messageList = messageRepository.findMessagesBySenderIdAndReceiverId(user1Id, user2Id).get();

        List<MessageDto> messageDtoList = new ArrayList<>();


        messageList.forEach((msg) -> {
            msg.setViewed(true);
            msg = messageRepository.save(msg);
            MessageDto messageDto = MessageDto.builder()
                    .id(msg.getId())
                    .receiverId(msg.getReceiver().getId())
                    .senderId(msg.getSender().getId())
                    .messageType(msg.getClass().getSimpleName())
                    .viewed(msg.isViewed())
                    //.contactIdWhereTheReceiverIsTheUser1(contact.getId())
                    .date(msg.getDate())
                    .build();

            switch (msg.getClass().getSimpleName()) {
                case "TextMessage" -> {
                    messageDto.setMessageType(MessageType.TEXT + "");
                    TextMessage textMessage = (TextMessage) msg;
                    messageDto.setHashedText(textMessage.getHashedText());
                }
                case "AudioMessage" -> {
                    messageDto.setMessageType(MessageType.AUDIO + "");
                    AudioMessage audioMessage = (AudioMessage) msg;
                    messageDto.setHashedAudio(audioMessage.getHashedAudio().getHashedAudio().toString());
                }
                default -> {
                    messageDto.setMessageType(MessageType.IMAGE + "");
                    ImageMessage imageMessage = (ImageMessage) msg;
                    //messageDto.setHashedImage(imageMessage.getHashedImage()); //requires convertion
                }

            }
            messageDtoList.add(messageDto);

        });
        return messageDtoList;
    }

            /*for (Message message : messageList) {
                MessageDto messageDto = new MessageDto();
                messageDto.setId(message.getId());
                messageDto.setDate(message.getDate());
                messageDto.setSenderId(message.getSender().getId());
                messageDto.setReceiverId(message.getReceiver().getId());
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

    /*public MessageDto sendAudioMessage(MessageDto messageDto, User receiver, User sender){
        Audio audio = new Audio();
        audio.setHashedAudio(messageDto.getHashedAudio());
        audio = audioRepository.save(audio);
        AudioMessage audioMessage = new AudioMessage();
        audioMessage.setDate(LocalDateTime.now());
        audioMessage.setReceiver(receiver);
        audioMessage.setSender(sender);
        audioMessage.setHashedAudio();
        AudioMessage savedAudioMessage = audioMessageRepository.save(audioMessage);
        messageDto.setDate(savedAudioMessage.getDate());
        return messageDto;
    }

    public MessageDto sendImageMessage(MessageDto messageDto, User receiver, User sender){
        List<MessageImage> messageImages = new ArrayList<>();
        for(MultipartFile multipartFile: messageDto.getHashedImage()){
            MessageImage messageImage = new MessageImage();


            messageImages.add(messageImage);
        }

        //messageImage.setContent(messageDto.getHashedImage());
               *//* profilePicture.setContent(userDto.getProfilePicture().getBytes());
            } catch (IOException e) {
                System.out
                        .println("updateUser() -> IOException");
                throw new RuntimeException(e);
            }
            profilePicture.setName(userDto.getProfilePicture().getName());
            profilePicture.setContentType(userDto.getProfilePicture().getContentType());
            profilePicture.setOriginalName(userDto.getProfilePicture().getOriginalFilename());
            profilePicture = ProfilePictureRepository.save(profilePicture);

            profilePicture.setUser(userToUpdate);
            ProfilePictureRepository.save(profilePicture);
        }*//*

        ImageMessage imageMessage = new ImageMessage();
        imageMessage.setDate(LocalDateTime.now());
        imageMessage.setReceiver(receiver);
        imageMessage.setSender(sender);
        imageMessage.s
        ImageMessage savedImageMessage = imageMessageRepository.save(imageMessage);
        messageDto.setDate(savedImageMessage.getDate());
        return messageDto;
    }*/

    @Transactional
    public MessageDto sendTextMessage(MessageDto messageDto, User receiver, User sender) {
        TextMessage textMessage = new TextMessage();
        textMessage.setDate(LocalDateTime.now());
        textMessage.setReceiver(receiver);
        textMessage.setSender(sender);
        textMessage.setViewed(false);
        textMessage.setHashedText(messageDto.getHashedText());
        TextMessage savedTextMessage = textMessageRepository.save(textMessage);
        messageDto.setDate(savedTextMessage.getDate());
        messageDto.setId(savedTextMessage.getId());
        /*messageDto.setContactIdWhereTheReceiverIsTheUser1(
                contactRepository.findByUser1IdAndUser2Id(messageDto.getSenderId(),messageDto.getReceiverId()).get().getId());*/
        return messageDto;
    }

    @Transactional
    public long findContactId(long user1Id, long user2Id) {
        Optional<Contact> contactOp = contactRepository.findByUser1IdAndUser2Id(user1Id, user2Id);
        return contactOp.map(Contact::getId).orElse(-1L);

    }

    @Transactional
    public List<MessageDto> getMessageListByLastMessageDate(LocalDateTime lastMessageDate, long user1Id,
                                                            long user2Id) {
        List<Message> messageList;
        List<MessageDto> messageDtoList = new ArrayList<>();
        messageList = messageRepository.findMessagesBySenderIdAndReceiverId(user1Id, user2Id).get();
        //setting message limit
        messageList = messageList.stream().limit(MESSAGE_LIMIT).collect(Collectors.toList());
        for (Message message : messageList) {
            MessageDto messageDto = new MessageDto();
            messageDto.setId(message.getId());
            messageDto.setDate(message.getDate());
            messageDto.setSenderId(message.getSender().getId());
            messageDto.setViewed(message.isViewed());
            String messageType = message.getClass().getSimpleName();

            switch (messageType) {
                case "TEXT" -> {
                    messageDto.setMessageType("TEXT");
                    TextMessage textMessage = (TextMessage) message;
                    messageDto.setHashedText(textMessage.getHashedText());
                }
                case "AUDIO" -> {
                    messageDto.setMessageType("AUDIO");
                    AudioMessage audioMessage = (AudioMessage) message;
                    messageDto.setHashedAudio(audioMessage.getHashedAudio().getHashedAudio().toString());
                }
                case "IMAGE" -> {
                    messageDto.setMessageType("IMAGE");
                    ImageMessage imageMessage = (ImageMessage) message;
                    //messageDto.setHashedImage(imageMessage.getHashedImage()); //requires convertion
                }
                default -> {
                    System.out.println("Tipo de mensagem desconhecido: " + messageType);
                }
            }
            messageDtoList.add(messageDto);
        }

        return messageDtoList;
    }

    public void viewMessageById(long messageId) {
        Optional<Message> messageOp = messageRepository.findById(messageId);
        if (messageOp.isEmpty()) return;
        Message msg = messageOp.get();
        msg.setViewed(true);
        messageRepository.save(msg);
    }
}
