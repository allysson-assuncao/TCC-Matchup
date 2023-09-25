package com.matchup;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class RunSpring  {

    public static void main(String[] args) {
        SpringApplication.run(RunSpring.class, args);
    }
}
