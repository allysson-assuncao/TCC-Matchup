package com.matchup.model.insterests_dependencies;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.model.Interest;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "age_rating", schema = "matchup")
public class AgeRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "ageRating")
    @JsonIgnore
    private List<Interest> interests;

    // <editor-fold desc="Constructors">
    public AgeRating() {

    }

    public AgeRating(String name) {
        this.name = name;
    }

    public AgeRating(Long id, String name) {
        this.id = id;
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

    public void setName(String name) {
        this.name = name;
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
