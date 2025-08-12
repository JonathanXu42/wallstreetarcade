package com.wallstreetarcade.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                .directory("../") // Look for .env in the parent directory (project root)
                .ignoreIfMissing()
                .load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        // Debugging: Print MONGO_URI to verify it's loaded
        System.out.println("MONGO_URI from .env: " + System.getProperty("MONGO_URI"));

        SpringApplication.run(BackendApplication.class, args);
    }

}
