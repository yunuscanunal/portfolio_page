package com.yunuscan.portfolio.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataConfig {

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        String dbUrl = System.getenv("DATABASE_URL");
        
        HikariConfig config = new HikariConfig();

        if (dbUrl != null && !dbUrl.isEmpty()) {
            URI uri = new URI(dbUrl);
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
        } else {
            config.setJdbcUrl("jdbc:postgresql://localhost:5433/portfolio_db");
            config.setUsername("postgres");
            config.setPassword("postgres");
        }
        
        return new HikariDataSource(config);
    }
}