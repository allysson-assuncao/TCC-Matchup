package com.matchup.dto;

import com.matchup.model.*;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserDto {

    private long id;
    private String username;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String rawPassword;
    private String cellphoneNumber;
    private Byte[] profilePicture;
    private String bio;
    private List<Long> friends;
    private List<Long> interests;
    private List<Long> sentMessages;
    private List<Long> receivedMessages;


    private long addressId;
    private int addressNumber;
    private String addressStreet;
    private String addressNeighborhood;
    private String addressCity;
    private String addressState;
    private String addressZipcode;


    public UserDto() {
    }

    public long getId() {return id;}

    public void setId(long id) {this.id = id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getEmail() {return email;}

    public void setEmail(String email) {this.email = email;}

    public LocalDate getBirthDate() {return birthDate;}

    public void setBirthDate(LocalDate birthDate) {this.birthDate = birthDate;}

    public String getRawPassword() {return rawPassword;}

    public void setRawPassword(String rawPassword) {this.rawPassword = rawPassword;}

    public String getCellphoneNumber() {return cellphoneNumber;}

    public void setCellphoneNumber(String cellphoneNumber) {this.cellphoneNumber = cellphoneNumber;}

    public Byte[] getProfilePicture() {return profilePicture;}

    public void setProfilePicture(Byte[] profilePicture) {this.profilePicture = profilePicture;}

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<Long> getFriends() {return friends;}

    public void setFriends(List<Long> friends) {this.friends = friends;}

    public List<Long> getInterests() {return interests;}

    public void setInterests(List<Long> interests) {this.interests = interests;}

    public List<Long> getSentMessages() {return sentMessages;}

    public void setSentMessages(List<Long> sentMessages) {this.sentMessages = sentMessages;}

    public List<Long> getReceivedMessages() {return receivedMessages;}

    public void setReceivedMessages(List<Long> receivedMessages) {this.receivedMessages = receivedMessages;}

    public long getAddressId() {return addressId;}

    public void setAddressId(long addressId) {this.addressId = addressId;}

    public int getAddressNumber() {return addressNumber;}

    public void setAddressNumber(int addressNumber) {this.addressNumber = addressNumber;}

    public String getAddressStreet() {return addressStreet;}

    public void setAddressStreet(String addressStreet) {this.addressStreet = addressStreet;}

    public String getAddressNeighborhood() {return addressNeighborhood;}

    public void setAddressNeighborhood(String addressNeighborhood) {this.addressNeighborhood = addressNeighborhood;}

    public String getAddressCity() {
        return addressCity;
    }

    public void setAddressCity(String addressCity) {
        this.addressCity = addressCity;
    }

    public String getAddressState() {return addressState;}

    public void setAddressState(String addressState) {this.addressState = addressState;}

    public String getAddressZipcode() {return addressZipcode;}

    public void setAddressZipcode(String addressZipcode) {this.addressZipcode = addressZipcode;}
}
