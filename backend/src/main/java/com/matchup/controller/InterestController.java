package com.matchup.controller;

import com.matchup.dto.InterestDependenciesDto;
import com.matchup.dto.InterestDto;
import com.matchup.dto.RequestDto;
import com.matchup.model.Interest;
import com.matchup.model.insterest.Company;
import com.matchup.model.insterest.Genre;
import com.matchup.model.insterest.Platform;
import com.matchup.model.insterest.SubGenre;
import com.matchup.service.InterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/interests")
public class InterestController {

    private final InterestService interestService;

    @Autowired
    public InterestController(InterestService interestService) {
        this.interestService = interestService;
    }


    @PostMapping("/specification")
    @PostAuthorize("true")
    public ResponseEntity<List<Interest>> searchInterest(@RequestBody RequestDto requestDto) {
        return new ResponseEntity<>(interestService.getInterestsBySpecification(requestDto), HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-all-dependencies")
    public ResponseEntity<InterestDependenciesDto> getInterestDependencies() {
        return new ResponseEntity<>(interestService.getInterestsDependencies(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/register/interest")
    @PostAuthorize("true")
    public ResponseEntity<Interest> registerInterest(@RequestBody InterestDto interestDto) {
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

}
