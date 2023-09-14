package com.matchup.model.insterests_dependencies;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.model.Interest;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "language", schema = "matchup")
public class Language {

    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "dubbingLanguages")
    @JsonIgnore
    private List<Interest> dubbedInterests;

    @ManyToMany(mappedBy = "subtitleLanguages")
    @JsonIgnore
    private List<Interest> subtitledInterest;

    // <editor-fold desc="Constructors">
    public Language() {
    }

    public Language(String name) {
        this.name = name;
    }

    public Language(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Interest> getDubbedInterests() {
        return dubbedInterests;
    }

    public void setDubbedInterests(List<Interest> dubbed_interests) {
        this.dubbedInterests = dubbed_interests;
    }

    public List<Interest> getSubtitledInterest() {
        return subtitledInterest;
    }

    public void setSubtitledInterest(List<Interest> subtitled_interest) {
        this.subtitledInterest = subtitled_interest;
    }

    // </editor-fold>

    public void addDubbedInterest(Interest dubbedInterest){
        if(this.dubbedInterests == null){
            this.dubbedInterests = new ArrayList<>();
        }
        this.dubbedInterests.add(dubbedInterest);
    }

    public void subtitledInterest(Interest subtitledInterest){
        if(this.subtitledInterest == null){
            this.subtitledInterest = new ArrayList<>();
        }
        this.subtitledInterest.add(subtitledInterest);
    }


}
