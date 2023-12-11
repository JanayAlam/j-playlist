package com.janay.cleanyoutubeapi.services;

import com.janay.cleanyoutubeapi.entities.User;
import com.janay.cleanyoutubeapi.expections.EtAuthException;
import com.janay.cleanyoutubeapi.repositories.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public User validateUser(String username, String password) throws EtAuthException {
        Optional<User> optionalUser = this.userRepository.findUserByUsername(username);
        // checking if the user exists or not
        if (optionalUser.isEmpty()) {
            throw new EtAuthException("Could not find any user with the provided username");
        }
        // checking the password
        if (BCrypt.checkpw(password, optionalUser.get().getPassword())) {
            // password matched
            return optionalUser.get();
        }
        // password did not match
        throw new EtAuthException("Password dit not matched");
    }

    public User addNewUser(User user) throws EtAuthException {
        Integer userCountByUsername = this.userRepository
                .countByUsername(user.getUsername());
        if (userCountByUsername > 0) {
            throw new EtAuthException("Username exists");
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10)));
        return this.userRepository.save(user);
    }
}
