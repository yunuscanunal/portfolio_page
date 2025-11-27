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
        // Heroku'nun otomatik verdiği DATABASE_URL'i okuyoruz
        String dbUrl = System.getenv("DATABASE_URL");
        
        HikariConfig config = new HikariConfig();

        if (dbUrl != null && !dbUrl.isEmpty()) {
            // --- HEROKU ORTAMI ---
            // "postgres://user:pass@host:port/db" formatını JDBC formatına çeviriyoruz
            URI uri = new URI(dbUrl);
            String username = uri.getUserInfo().split(":")[0];
            String password = uri.getUserInfo().split(":")[1];
String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ':' + uri.getPort() + uri.getPath() + "?sslmode=require";
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(username);
            config.setPassword(password);
        } else {
            // --- LOCALHOST ORTAMI ---
            // Eğer Heroku URL'i yoksa (bilgisayarında çalışıyorsa) burası çalışır
            config.setJdbcUrl("jdbc:postgresql://localhost:5433/portfolio_db");
            config.setUsername("postgres");
            config.setPassword("postgres");
        }
        
        return new HikariDataSource(config);
    }
}