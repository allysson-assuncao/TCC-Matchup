package com.matchup.model.image;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "image_type")
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

    // <editor-fold desc="Constructors">

    public ImageModel() {
    }

    public ImageModel(String name, String originalName, byte[] content, String contentType) {
        this.name = name;
        this.originalName = originalName;
        this.content = content;
        this.contentType = contentType;
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

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    // </editor-fold>

}
