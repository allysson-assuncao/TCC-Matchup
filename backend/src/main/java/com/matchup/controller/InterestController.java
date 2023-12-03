package com.matchup.controller;

import com.matchup.dto.InterestDependenciesDto;
import com.matchup.dto.InterestDto;
import com.matchup.dto.RequestDto;
import com.matchup.dto.SearchRequestDto;
import com.matchup.model.Interest;
import com.matchup.model.insterest.Company;
import com.matchup.model.insterest.Genre;
import com.matchup.model.insterest.Platform;
import com.matchup.model.insterest.SubGenre;
import com.matchup.service.FilterSpecificationService;
import com.matchup.service.InterestService;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/interests")
public class InterestController {

    private final InterestService interestService;
    private final UserService userService;

    private final FilterSpecificationService filterSpecificationService;

    @Autowired
    public InterestController(InterestService interestService, FilterSpecificationService filterSpecificationService, UserService userService) {
        this.interestService = interestService;
        this.filterSpecificationService = filterSpecificationService;
        this.userService = userService;
    }

    @PostMapping("/link-to-user")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> linkInterestToUser(@RequestBody Map<String, Long> linkInterestToUser) {
        return new ResponseEntity<>(userService.linkInterestToUser(linkInterestToUser.get("userId"), linkInterestToUser.get("interestId")), HttpStatus.OK);
    }


    /*@PostMapping("/specification")
    @PostAuthorize("true")
    public ResponseEntity<List<Interest>> searchInterest(@RequestBody RequestDto requestDto) {
        return new ResponseEntity<>(interestService.getInterestsBySpecification(requestDto), HttpStatus.ACCEPTED);
    }*/

    @GetMapping("/get-all-dependencies")
    public ResponseEntity<InterestDependenciesDto> getInterestDependencies() {
        return new ResponseEntity<>(interestService.getInterestsDependencies(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/register/interest")
    @PostAuthorize("true")
    public ResponseEntity<Interest> registerInterest(@ModelAttribute InterestDto interestDto) {
        System.out.println(interestDto.getName());
        return new ResponseEntity<>(interestService.saveInterest(interestDto), HttpStatus.ACCEPTED);
    }

    @PostMapping("/register/company")
    @PostAuthorize("true")
    public ResponseEntity<Company> registerCompany(@RequestBody Company company) {
        return new ResponseEntity<>(interestService.saveCompany(company), HttpStatus.ACCEPTED);
    }

    @PostMapping("/register/genre")
    @PostAuthorize("true")
    public ResponseEntity<Genre> registerGenre(@RequestBody Genre genre) {
        return new ResponseEntity<>(interestService.saveGenre(genre), HttpStatus.ACCEPTED);
    }

    @PostMapping("/register/subgenre")
    @PostAuthorize("true")
    public ResponseEntity<SubGenre> registerSubGenre(@RequestBody SubGenre subGenre) {
        return new ResponseEntity<>(interestService.saveSubGenre(subGenre), HttpStatus.ACCEPTED);
    }

    @PostMapping("/register/platform")
    @PostAuthorize("true")
    public ResponseEntity<Platform> registerPlatform(@RequestBody Platform platform) {
        return new ResponseEntity<>(interestService.savePlatform(platform), HttpStatus.ACCEPTED);
    }

    /*@PostMapping("/get-all-filtered")
    @PostAuthorize("true")
    public ResponseEntity<Specification> getAllFiltered(@RequestBody List<SearchRequestDto> searchRequestDtos) {
        return new ResponseEntity<>(filterSpecificationService.getSearchSpecification(searchRequestDtos), HttpStatus.ACCEPTED);
    }*/

    @PostMapping("/get-by-specifications")
    public Page<Interest> getInterestsBySpecificationWithPagination(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "name") String orderBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction,
            @RequestBody RequestDto requestsDto) {

        return interestService.getInterestsBySpecificationWithPagination(requestsDto.getSearchRequestDtos(), page, size, orderBy, direction);
    }
}
