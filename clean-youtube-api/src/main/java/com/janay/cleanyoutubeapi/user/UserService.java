package com.janay.cleanyoutubeapi.user;

import com.janay.cleanyoutubeapi.expections.EmailExistsException;
import com.janay.cleanyoutubeapi.expections.UnauthorizedException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    @Autowired
    public UserService(UserRepository userRepository,
                       UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
    }

    public List<UserResponseDTO> getUser() {
        return userRepository.findAll()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public void validateUser(String email, String password) throws UnauthorizedException {
        Optional<User> optionalUser = this.userRepository.findUserByEmail(email);
        // checking if the user exists or not
        if (optionalUser.isEmpty()) throw new UnauthorizedException("Invalid credentials");
        // checking the password
        if (!BCrypt.checkpw(password, optionalUser.get().getPassword())) {
            // password did not match
            throw new UnauthorizedException("Invalid credentials");
        }
    }

    public void addNewUser(User user) throws UnauthorizedException {
        Integer userCountByEmail = this.userRepository.countByEmail(user.getEmail());
        if (userCountByEmail > 0) throw new EmailExistsException("Email already exists");
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10)));
        this.userRepository.save(user);
    }
}
