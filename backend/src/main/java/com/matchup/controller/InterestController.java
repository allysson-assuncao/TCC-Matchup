package com.matchup.controller;

import com.matchup.dto.RequestDto;
import com.matchup.model.Interest;
import com.matchup.service.InterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/search-interests")
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

       /* @GetMapping("/get/platform/all")
        public ResponseEntity<List<Platform>> getAllPlatforms() {
            return new ResponseEntity<>(interestService.getAllPlatforms(), HttpStatus.ACCEPTED);
        }*/



}
