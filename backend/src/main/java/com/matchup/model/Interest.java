package com.matchup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.matchup.model.insterests_dependencies.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
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



    // <editor-fold desc="Constructors">
    public Interest() {
    }

    public Interest(String name, String description, Company company, double lowestPrice, double highestPrice, AgeRating ageRating) {
        this.name = name;
        this.description = description;
        this.company = company;
        this.lowestPrice = lowestPrice;
        this.highestPrice = highestPrice;
        this.ageRating = ageRating;
    }

    public Interest(String name, String description, Company company, double lowestPrice, double highestPrice, List<Language> dubbingLanguages, List<Language> subtitleLanguages, List<Genre> genres, List<SubGenre> subGenres, List<Platform> platforms, AgeRating ageRating, List<User> users) {
        this.name = name;
        this.description = description;
        this.company = company;
        this.lowestPrice = lowestPrice;
        this.highestPrice = highestPrice;
        this.dubbingLanguages = dubbingLanguages;
        this.subtitleLanguages = subtitleLanguages;
        this.genres = genres;
        this.subGenres = subGenres;
        this.platforms = platforms;
        this.ageRating = ageRating;
        this.users = users;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public double getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(double highestPrice) {
        this.highestPrice = highestPrice;
    }

    public List<Language> getDubbingLanguages() {
        return dubbingLanguages;
    }

    public void setDubbingLanguages(List<Language> dubbingLanguages) {
        this.dubbingLanguages = dubbingLanguages;
    }

    public List<Language> getSubtitleLanguages() {
        return subtitleLanguages;
    }

    public void setSubtitleLanguages(List<Language> subtitleLanguages) {
        this.subtitleLanguages = subtitleLanguages;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public List<SubGenre> getSubGenres() {
        return subGenres;
    }

    public void setSubGenres(List<SubGenre> subGenre) {
        this.subGenres = subGenre;
    }

    public List<Platform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<Platform> platforms) {
        this.platforms = platforms;
    }

    public AgeRating getAgeRating() {
        return ageRating;
    }

    public void setAgeRating(AgeRating ageRating) {
        this.ageRating = ageRating;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    // </editor-fold>

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

    /*@Override
    public String toString() {
        return "Interest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", company=" + company +
                ", lowestPrice=" + lowestPrice +
                ", highestPrice=" + highestPrice +
                ", dubbingLanguages=" + dubbingLanguages +
                ", subtitleLanguages=" + subtitleLanguages +
                ", genres=" + genres +
                ", subGenres=" + subGenres +
                ", platforms=" + platforms +
                ", ageRating=" + ageRating +
                ", users=" + users +
                '}';
    }*/

}