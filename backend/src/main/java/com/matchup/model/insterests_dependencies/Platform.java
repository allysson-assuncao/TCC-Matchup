package com.matchup.model.insterests_dependencies;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.model.Interest;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "platform", schema = "matchup")
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "platforms")
    @JsonIgnore
    private List<Interest> interests;

    // <editor-fold desc="Constructors">
    public Platform() {
    }

    public Platform(String name) {
        this.name = name;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Interest> getInterests() {
        return interests;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setInterests(List<Interest> interests) {
        this.interests = interests;
    }

    // </editor-fold>

    public void addInterest(Interest interest){
        if(this.interests == null){
            this.interests = new ArrayList<>();
        }
        this.interests.add(interest);
    }

    @Override
    public String toString() {
        return super.toString();
    }

}
