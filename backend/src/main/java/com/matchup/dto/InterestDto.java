package com.matchup.dto;

import java.util.List;

public class InterestDto {
    private long id;
    private String name;
    private String description;
    private Long companyId;
    private double lowestPrice;
    private double highestPrice;
    private Long ageRatingId;
    private List<Long> usersIdList;
    private List<Long> platformsIdList;
    private List<String> dubbingLanguagesIdList;
    private List<String> subtitleLanguagesIdList;
    private List<Long> genresIdList;
    private List<Long> subGenresIdList;


    public InterestDto() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
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

    public Long getAgeRatingId() {
        return ageRatingId;
    }

    public void setAgeRatingId(Long ageRatingId) {
        this.ageRatingId = ageRatingId;
    }

    public List<Long> getUsersIdList() {
        return usersIdList;
    }

    public void setUsersIdList(List<Long> usersIdList) {
        this.usersIdList = usersIdList;
    }

    public List<Long> getPlatformsIdList() {
        return platformsIdList;
    }

    public void setPlatformsIdList(List<Long> platformsIdList) {
        this.platformsIdList = platformsIdList;
    }

    public List<String> getDubbingLanguagesIdList() {
        return dubbingLanguagesIdList;
    }

    public void setDubbingLanguagesIdList(List<String> dubbingLanguagesIdList) {
        this.dubbingLanguagesIdList = dubbingLanguagesIdList;
    }

    public List<String> getSubtitleLanguagesIdList() {
        return subtitleLanguagesIdList;
    }

    public void setSubtitleLanguagesIdList(List<String> subtitleLanguagesIdList) {
        this.subtitleLanguagesIdList = subtitleLanguagesIdList;
    }

    public List<Long> getGenresIdList() {
        return genresIdList;
    }

    public void setGenresIdList(List<Long> genresIdList) {
        this.genresIdList = genresIdList;
    }

    public List<Long> getSubGenresIdList() {
        return subGenresIdList;
    }

    public void setSubGenresIdList(List<Long> subGenresIdList) {
        this.subGenresIdList = subGenresIdList;
    }
}
