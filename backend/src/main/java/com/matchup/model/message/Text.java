package com.matchup.model.message;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "text", schema = "matchup")
public class Text {
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "hashed_text", nullable = false, updatable = false)
    private String hashedText;

    @Column(name = "edited", nullable = false, updatable = true)
    private boolean edited;

    @OneToMany(mappedBy = "hashedText")
    private List<TextMessage> textMessages;

    // <editor-fold desc="Constructors">

    public Text() {
    }

    public Text(String hashedText, boolean edited, List<TextMessage> textMessages) {
        this.hashedText = hashedText;
        this.edited = edited;
        this.textMessages = textMessages;
    }

    public Text(long id, String hashedText, boolean edited, List<TextMessage> textMessages) {
        this.id = id;
        this.hashedText = hashedText;
        this.edited = edited;
        this.textMessages = textMessages;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHashedText() {
        return hashedText;
    }

    public void setHashedText(String hashedText) {
        this.hashedText = hashedText;
    }

    public boolean isEdited() {
        return edited;
    }

    public void setEdited(boolean edited) {
        this.edited = edited;
    }

    public List<TextMessage> getTextMessages() {
        return textMessages;
    }

    public void setTextMessages(List<TextMessage> textMessages) {
        this.textMessages = textMessages;
    }

    // </editor-fold>


}
