package com.matchup.model.insterests_dependencies;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.model.Interest;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "company", schema = "matchup")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "company")
    @JsonIgnore
    private List<Interest> interests;

    // <editor-fold desc="Constructors">
    public Company() {
    }

    public Company(String name) {
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

    /*Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", interests=" + interests +
                '}';
    }*/
}
