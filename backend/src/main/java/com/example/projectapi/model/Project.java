package com.example.projectapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

@Entity
@Table(name = "projects") // İsteğe bağlı tablo adı
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Başlık boş olamaz")
    @Size(min = 3, max = 255, message = "Başlık 3-255 karakter olmalı")
    private String title;

    @NotBlank(message = "Açıklama boş olamaz")
    @Size(min = 10, max = 1000, message = "Açıklama 10-1000 karakter olmalı")
    @Column(length = 1000)
    private String description;

    @Size(max = 255, message = "Görsel URL en fazla 255 karakter olmalı")
    private String image;

    @URL(message = "Geçerli bir GitHub URL giriniz")
    @Size(max = 255)
    private String codeLink;

    @URL(message = "Geçerli bir canlı link giriniz")
    @Size(max = 255)
    private String liveLink;

    public Project() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCodeLink() {
        return codeLink;
    }

    public void setCodeLink(String codeLink) {
        this.codeLink = codeLink;
    }

    public String getLiveLink() {
        return liveLink;
    }

    public void setLiveLink(String liveLink) {
        this.liveLink = liveLink;
    }
}
