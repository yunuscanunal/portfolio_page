package com.example.projectapi.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {
    private static final long TIME_WINDOW_MS = 60_000; // 1 dakika
    private static final int MAX_REQUESTS = 30; // 1 dakikada 30 istek

    private final Map<String, RequestInfo> ipRequestMap = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String ip = request.getRemoteAddr();
        long now = System.currentTimeMillis();
        RequestInfo info = ipRequestMap.getOrDefault(ip, new RequestInfo(0, now));

        if (now - info.startTime > TIME_WINDOW_MS) {
            info = new RequestInfo(0, now);
        }
        info.count++;
        ipRequestMap.put(ip, info);

        if (info.count > MAX_REQUESTS) {
            response.setStatus(429);
            response.getWriter().write("Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.");
            return;
        }
        filterChain.doFilter(request, response);
    }

    private static class RequestInfo {
        int count;
        long startTime;
        RequestInfo(int count, long startTime) {
            this.count = count;
            this.startTime = startTime;
        }
    }
} 