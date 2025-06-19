package com.example.projectapi.util;

public class InputSanitizer {
    public static String sanitize(String input) {
        if (input == null) return null;
        // Temel XSS koruması: <, >, &, ' ve " karakterlerini değiştir
        return input
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("&", "&amp;")
                .replaceAll("'", "&#39;")
                .replaceAll("\"", "&quot;");
    }
} 