package com.yunuscan.portfolio.repository;

import com.yunuscan.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // İleride özel sorgular gerekirse buraya eklenir (örn: findByTitle vs.)
}