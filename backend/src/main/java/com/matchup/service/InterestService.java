package com.matchup.service;

import com.matchup.dto.InterestDependenciesDto;
import com.matchup.dto.InterestDto;
import com.matchup.dto.SearchRequestDto;
import com.matchup.model.Interest;
import com.matchup.model.User;
import com.matchup.model.image.InterestImage;
import com.matchup.model.image.ProfilePicture;
import com.matchup.model.insterest.*;
import com.matchup.model.insterest.Company;
import com.matchup.repository.InterestRepository;
import com.matchup.repository.image.InterestImageRepository;
import com.matchup.repository.interest.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@ToString
@Setter
@Getter
@Transactional
public class InterestService {

    private final FilterSpecificationService<Interest> filterSpecificationService;

    private final InterestRepository interestRepository;
    private final AgeRatingRepository ageRatingRepository;
    private final GenreRepository genreRepository;
    private final SubGenreRepository subGenreRepository;
    private final LanguageRepository languageRepository;
    private final PlatformRepository platformRepository;
    private final CompanyRepository companyRepository;
    private final InterestImageRepository interestImageRepository;

    @Autowired
    public InterestService(FilterSpecificationService<Interest> filterSpecificationService, InterestRepository interestRepository, AgeRatingRepository ageRatingRepository, GenreRepository genreRepository, SubGenreRepository subGenreRepository, LanguageRepository languageRepository, PlatformRepository platformRepository, CompanyRepository companyRepository, InterestImageRepository interestImageRepository) {
        this.filterSpecificationService = filterSpecificationService;
        this.interestRepository = interestRepository;
        this.ageRatingRepository = ageRatingRepository;
        this.genreRepository = genreRepository;
        this.subGenreRepository = subGenreRepository;
        this.languageRepository = languageRepository;
        this.platformRepository = platformRepository;
        this.companyRepository = companyRepository;
        this.interestImageRepository = interestImageRepository;
    }


    @Transactional
    public Interest saveInterest(InterestDto interestDto) {
        Interest interestToSave = new Interest();

        System.out.println("Interest: " + interestDto);
        System.out.println("DubbingLaguage Id: " + interestDto.getDubbingLanguagesIdList());

        interestToSave.setName(interestDto.getName());
        interestToSave.setCompany(
                companyRepository.findById(interestDto.getCompanyId()).get());
        interestToSave.setLowestPrice(interestDto.getLowestPrice());
        interestToSave.setHighestPrice(interestDto.getHighestPrice());
        interestToSave.setAgeRating(
                ageRatingRepository.findById(interestDto.getAgeRatingId()).get());
        interestToSave.setDubbingLanguages(
                languageRepository.findByIdIn(interestDto.getDubbingLanguagesIdList()));
        interestToSave.setSubtitleLanguages(
                languageRepository.findByIdIn(interestDto.getSubtitleLanguagesIdList()));
        interestToSave.setGenres(
                genreRepository.findAllById(interestDto.getGenresIdList()));
        interestToSave.setSubGenres(
                subGenreRepository.findAllById(interestDto.getSubGenresIdList()));
        interestToSave.setPlatforms(
                platformRepository.findAllById(interestDto.getPlatformsIdList()));

        List<InterestImage> images = new ArrayList<>();


        interestToSave = interestRepository.save(interestToSave);

        Interest finalInterestToSave = interestToSave;
        interestDto.getImages().forEach((i) -> {
            try {
                InterestImage image = new InterestImage();
                image.setContent(i.getBytes());
                image.setName(i.getName());
                image.setContentType(i.getContentType());
                image.setOriginalName(i.getOriginalFilename());
                image = interestImageRepository.save(image);
                image.setInterest(finalInterestToSave);
                image = interestImageRepository.save(image);
                images.add(image);
                
            } catch (IOException e) {
                System.out.println("updateUser() -> IOException");
                throw new RuntimeException(e);
            }
        });

        interestToSave.setImages(images);

        return interestRepository.save(interestToSave);
    }

    @Transactional(readOnly = true)
    public Page<Interest> getInterestsBySpecificationWithPagination(UserDetails userDetails, List<SearchRequestDto> searchRequestDtos, int page, int size, String orderBy, Sort.Direction direction) {
        Specification<Interest> searchSpecification =
                filterSpecificationService.getSearchSpecification(searchRequestDtos, orderBy, direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, orderBy));

        Page<Interest> interestPage = interestRepository.findAll(searchSpecification, pageable);
        interestPage.getContent().forEach((interest -> {
            interest.getFormattedImageList();
            interest.setAdded(interestRepository.existsByInterestIdAndUserUsername(interest.getId(), userDetails.getUsername()));
        }));

        return interestPage;
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public Language saveLanguage(Language language) {
        return languageRepository.save(language);
    }

    public AgeRating saveAgeRating(AgeRating ageRating) {
        return ageRatingRepository.save(ageRating);
    }

    public Genre saveGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public SubGenre saveSubGenre(SubGenre subGenre) {
        return subGenreRepository.save(subGenre);
    }

    public Platform savePlatform(Platform platform) {
        return platformRepository.save(platform);
    }

    // GET ALL
    public List<Interest> getAllInterests() {
        return interestRepository.findAll();
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public List<AgeRating> getAllAgeRatings() {
        return ageRatingRepository.findAll();
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public List<SubGenre> getAllSubGenres() {
        return subGenreRepository.findAll();
    }

    public List<Platform> getAllPlatforms() {
        return platformRepository.findAll();
    }

    public InterestDependenciesDto getInterestsDependencies() {
        InterestDependenciesDto interestDependenciesDto = new InterestDependenciesDto();
        interestDependenciesDto.setCompanies(companyRepository.findAll());
        interestDependenciesDto.setAgeRatings(ageRatingRepository.findAll());
        interestDependenciesDto.setGenres(genreRepository.findAll());
        interestDependenciesDto.setSubGenres(subGenreRepository.findAll());
        interestDependenciesDto.setPlatforms(platformRepository.findAll());
        return interestDependenciesDto;
    }

    @Transactional
    @jakarta.transaction.Transactional
    public void updateInterestImagesById(String username, long interestId, MultipartFile[] imageList) {


        Optional<Interest> interestOp = interestRepository.findById(interestId);
        if(interestOp.isEmpty()) return;
        Interest interestToUpdate = interestOp.get();

        ArrayList<InterestImage> interestImageList = new ArrayList<>();
        if(interestToUpdate.getImages() != null || !interestToUpdate.getImages().isEmpty()){
            interestImageRepository.deleteByInterestId(interestId);
        }
        if (imageList != null || imageList.length == 0) {
            for(MultipartFile interestMultipartFile: imageList){
                var interestImage = new InterestImage();
                try {
                    interestImage.setContent(interestMultipartFile.getBytes());
                } catch (IOException e) {
                    System.out
                            .println("updateInterestImages() -> IOException");
                    throw new RuntimeException(e);
                }
                interestImage.setName(interestMultipartFile.getName());
                interestImage.setContentType(interestMultipartFile.getContentType());
                interestImage.setOriginalName(interestMultipartFile.getOriginalFilename());
                interestImage.setInterest(interestToUpdate);
                interestImageRepository.save(interestImage);
            }
        }

        interestToUpdate.setImages(interestImageList);
        Interest interest = interestRepository.save(interestToUpdate);

    }
}
