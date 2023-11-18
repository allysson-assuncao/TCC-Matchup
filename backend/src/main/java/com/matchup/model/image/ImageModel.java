package com.matchup.model.image;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "image_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public abstract class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "original_name")
    private String originalName;

    @Lob
    @Column(name = "content", updatable = true)
    private byte[] content;

    @Column(name = "content_type")
    private String contentType;

}
