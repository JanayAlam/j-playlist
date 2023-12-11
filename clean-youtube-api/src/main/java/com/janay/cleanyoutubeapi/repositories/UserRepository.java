package com.janay.cleanyoutubeapi.repositories;

import com.janay.cleanyoutubeapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);

    Integer countByUsername(String username);
}
