package com.janay.cleanyoutubeapi.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User alam = new User("Janay", "Alam", "alam@gmail.com", "alam1234");
            User sara = new User("Anika Anmol", "Sara", "sara@gmail.com", "sara1234");
            repository.saveAll(List.of(alam, sara));
        };
    }
}
