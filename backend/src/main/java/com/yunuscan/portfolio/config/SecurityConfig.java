package com.yunuscan.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.HeaderWriterFilter;
import org.springframework.security.web.header.writers.DelegatingRequestMatcherHeaderWriter;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Value("${cors.allowed-origins}")
    private String allowedOriginsEnv;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable) 
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/experiences/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // OPTIONS her zaman serbest
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        List<String> origins = Arrays.stream(allowedOriginsEnv.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
        
        System.out.println("🔍 CORS Origins Configured: " + origins);

        config.setAllowedOrigins(origins);
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setMaxAge(3600L); // 1 saat yeterli
        config.setAllowCredentials(true);
        
        source.registerCorsConfiguration("/**", config);
        
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE); // Filtre zincirinin en başına koyar
        return bean;
    }
    @Bean
    public FilterRegistrationBean<HeaderWriterFilter> cspHeaders() {
        FilterRegistrationBean<HeaderWriterFilter> registrationBean = new FilterRegistrationBean<>();
        
        HeaderWriterFilter filter = new HeaderWriterFilter(
            List.of(
                new DelegatingRequestMatcherHeaderWriter(
                    AnyRequestMatcher.INSTANCE,
                    new HeaderWriter() {
                        @Override
                        public void writeHeaders(HttpServletRequest request, HttpServletResponse response) {
                            response.setHeader("Content-Security-Policy", 
                            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;");
                            response.setHeader("X-Content-Type-Options", "nosniff");
                            response.setHeader("X-Frame-Options", "DENY");
                            response.setHeader("X-XSS-Protection", "1; mode=block");
                        }
                    }
                )
            )
        );
        registrationBean.setFilter(filter);
        return registrationBean;
    }
}