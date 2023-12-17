package com.matchup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.model.image.InterestImage;
import com.matchup.model.insterest.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "interest", schema = "matchup")
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", length = 2000)
    private String description;

    @ManyToOne
    private Company company;

    @Column(name = "lowest_price", nullable = false)
    private double lowestPrice;

    @Column(name = "highest_price", nullable = false)
    private double highestPrice;

    @ManyToMany
    @JoinTable(
            name = "interest_dubbing_languages",
            joinColumns = @JoinColumn(name = "interestid"),
            inverseJoinColumns = @JoinColumn(name = "language.id")
    )
    private List<Language> dubbingLanguages;

    @ManyToMany
    @JoinTable(
            name = "interest_subtitle_languages",
            joinColumns = @JoinColumn(name = "interest.id"),
            inverseJoinColumns = @JoinColumn(name = "language.id")
    )
    private List<Language> subtitleLanguages;

    @ManyToMany
    private List<Genre> genres;

    @ManyToMany
    private List<SubGenre> subGenres;

    @ManyToMany
    private List<Platform> platforms;

    @ManyToOne
    private AgeRating ageRating;

    @JsonIgnore
    @ManyToMany(mappedBy = "interests")
    private List<User> users;

    @OneToMany(mappedBy = "interest")
    private List<InterestImage> images;

    public void addDubbingLanguages(Language dubbingLanguage){
        if(this.dubbingLanguages == null){
            this.dubbingLanguages = new ArrayList<>();
        }
        this.dubbingLanguages.add(dubbingLanguage);
    }
    public void addSubtitleLanguages(Language subtitleLanguage){
        if(this.subtitleLanguages == null){
            this.subtitleLanguages = new ArrayList<>();
        }
        this.subtitleLanguages.add(subtitleLanguage);
    }

    public void addGenre(Genre genre){
        if(this.genres == null){
            this.genres = new ArrayList<>();
        }
        this.genres.add(genre);
    }

    public void addSubGenre(SubGenre subGenre){
        if(this.subGenres == null){
            this.subGenres = new ArrayList<>();
        }
        this.subGenres.add(subGenre);
    }

    public void addPlatform(Platform platform){
        if(this.platforms == null){
            this.platforms = new ArrayList<>();
        }
        this.platforms.add(platform);
    }

    public void addUser(User user){
        if(this.users == null){
            this.users = new ArrayList<>();
        }
        this.users.add(user);
    }


}