package com.yunuscan.portfolio.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String period; // Örn: "2023 - Present"
    
    @Column(length = 1000)
    private String description;

    @ElementCollection // Teknolojileri liste olarak tutmak için
    private List<String> techStack;

    // Boş Constructor
    public Experience() {}

    // Dolu Constructor
    public Experience(String company, String role, String period, String description, List<String> techStack) {
        this.company = company;
        this.role = role;
        this.period = period;
        this.description = description;
        this.techStack = techStack;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }
}