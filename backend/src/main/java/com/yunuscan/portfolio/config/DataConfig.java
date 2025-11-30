package com.yunuscan.portfolio.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataConfig {
    @Value("${DATABASE_URL:#{null}}")
    private String databaseUrl;
    @Bean
    public DataSource dataSource() throws URISyntaxException {
        HikariConfig config = new HikariConfig();

        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            URI uri = new URI(databaseUrl);
            String username = uri.getUserInfo().split(":")[0];
            String password = uri.getUserInfo().split(":")[1];
            String jdbcUrl = String.format(
                "jdbc:postgresql://%s:%d%s?sslmode=require",
                uri.getHost(),
                uri.getPort(),
                uri.getPath()
            );
            
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(username);
            config.setPassword(password);
            
            config.setMaximumPoolSize(10);
            config.setMinimumIdle(2);
            config.setConnectionTimeout(30000);
            config.setIdleTimeout(600000);
            config.setMaxLifetime(1800000);
        } else {
            config.setJdbcUrl("jdbc:postgresql://localhost:5433/portfolio_db");
            config.setUsername("postgres");
            config.setPassword("postgres");
            config.setMaximumPoolSize(5);
        }
        
        return new HikariDataSource(config);
    }
}