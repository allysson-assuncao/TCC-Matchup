package com.matchup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchup.dto.InterestDto;
import com.matchup.model.image.InterestImage;
import com.matchup.model.image.ProfilePicture;
import com.matchup.model.insterest.*;
import com.matchup.tools.BlobMultipartFile;
import com.matchup.tools.ImageResizer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @JsonIgnore
    @OneToMany(mappedBy = "interest")
    private List<InterestImage> images;

    @Transient
    private List<String> formattedImages = new ArrayList<>();

    @Transient
    private boolean added;
    /*private List<String> formattedImages = images.stream()
            .map(img -> "data:image/png;base64," + img.getBase64EncodedContent())
            .collect(Collectors.toList());*/


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

    public List<String> getFormattedImageList(){

        for(InterestImage img: this.images){
            formattedImages.add("data:image/png;base64," + img.getBase64EncodedContent());
        }

        return formattedImages;

    }

}