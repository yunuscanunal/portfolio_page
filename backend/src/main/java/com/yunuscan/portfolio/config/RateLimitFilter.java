package com.yunuscan.portfolio.config;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import java.time.Duration;

@Component
public class RateLimitFilter extends OncePerRequestFilter {
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String ip = request.getRemoteAddr();
        Bucket bucket = resolveBucket(ip);
        
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(429); // Too Many Requests
            response.getWriter().write("{\"error\":\"Rate limit exceeded\"}");
        }
    }

    private Bucket resolveBucket(String ip) {
        return cache.computeIfAbsent(ip, k -> 
            Bucket.builder()
                .addLimit(Bandwidth.simple(100, Duration.ofMinutes(1))) // 100 req/min
                .build()
        );
    }
}
