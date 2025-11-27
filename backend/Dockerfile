# 1. Aşama: Build (Maven kullanarak projeyi derle)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
# Testleri atlayarak derle (Hız kazanmak için)
RUN mvn clean package -DskipTests

# 2. Aşama: Run (Sadece çalışan JAR dosyasını al)
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Build aşamasından çıkan JAR dosyasını kopyala
COPY --from=build /app/target/portfolio-backend-0.0.1-SNAPSHOT.jar app.jar

# Heroku'nun atadığı portu kullan
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]