package com.matchup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.dto.UserDto;
import com.matchup.enums.UserAccess;
import com.matchup.model.image.ProfilePicture;
import com.matchup.model.message.Message;
import com.matchup.model.notification.Notification;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "user", schema = "matchup")

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User implements UserDetails {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Size(min = 5, max = 20)
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "birth_date", nullable = false, updatable = false)
    private LocalDate birthDate;

    @Column(name = "hashed_password", length = 455, nullable = true, updatable = true)
    private String hashedPassword;

    @Column(name = "cellphone_number", nullable = true, length = 455)
    private String cellphoneNumber;

    @JsonIgnore
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private ProfilePicture profilePicture;

    @Column(name = "bio", length = 2000, updatable = true)
    private String bio;

    @Column(name = "access", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserAccess access;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "access_identifier")
    private AccessIdentifier accessIdentifier;*/

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Friendship> friends;

    @ManyToMany
    private List<Interest> interests;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<VerificationCode> codes;

    @JsonIgnore
    @OneToMany(mappedBy = "blocker")
    private List<Block> blockList;


    public Friendship getFriendshipWithThisUser(User user) {
        for (Friendship f : this.friends) {
            if (user.getId() == f.getFriend().getId()) {
                return f;
            }
        }
        return null;
    }

    public void addFriendship(Friendship friendship) {
        if (this.friends == null) {
            this.friends = new ArrayList<>();
        }
        this.friends.add(friendship);
    }

    public void addInterest(Interest interest) {
        if (this.interests == null) {
            this.interests = new ArrayList<>();
        }
        this.interests.add(interest);
    }

    public void addSentMessage(Message message) {
        if (this.sentMessages == null) {
            this.sentMessages = new ArrayList<>();
        }
        this.sentMessages.add(message);
    }

    public void addReceivedMessage(Message message) {
        if (this.receivedMessages == null) {
            this.receivedMessages = new ArrayList<>();
        }
        this.receivedMessages.add(message);
    }

    public void addNotification(Notification notification) {
        if (this.notifications == null) {
            this.notifications = new ArrayList<>();
        }
        this.notifications.add(notification);
    }

    public void updateData(UserDto userDto) {
        this.bio = userDto.getBio();
        this.cellphoneNumber = userDto.getCellphoneNumber();
        this.username = userDto.getUsername();
    }

    public void updateData(UserDto userDto, ProfilePicture profilePicture) {
        this.bio = userDto.getBio();
        this.cellphoneNumber = userDto.getCellphoneNumber();
        this.username = userDto.getUsername();
        this.profilePicture = profilePicture;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + birthDate +
                ", hashedPassword='" + hashedPassword + '\'' +
                ", cellphoneNumber='" + cellphoneNumber + '\'' +
                ", profilePicture=" + profilePicture.getName() +
                ", address=" + address +
                ", friends=" + friends +
                ", interests=" + interests +
                ", sentMessages=" + sentMessages +
                ", receivedMessages=" + receivedMessages +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return this.hashedPassword;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
