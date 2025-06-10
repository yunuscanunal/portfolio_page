package com.example.projectapi.model;

public class Project {
    private String title;
    private String description;
    private String link;

    public Project() {
    }

    public Project(String title, String description, String link) {
        this.title = title;
        this.description = description;
        this.link = link;
    }

    // Getters and setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}
