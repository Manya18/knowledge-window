FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
WORKDIR /app
COPY --from=builder /app/target/knowledgewindow.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8090