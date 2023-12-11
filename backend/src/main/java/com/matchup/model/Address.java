package com.matchup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "address", schema = "matchup")
public class Address {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "number", nullable = false, length = 10)
    private int number;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "neighborhood", nullable = false)
    private String neighborhood;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "zipcode", nullable = false, length = 12)
    private String zipcode;

    @JsonIgnore
    @OneToOne(mappedBy = "address")
    private User user;

}
