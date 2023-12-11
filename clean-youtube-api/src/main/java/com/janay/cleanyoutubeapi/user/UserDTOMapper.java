package com.janay.cleanyoutubeapi.user;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserResponseDTO> {
    @Override
    public UserResponseDTO apply(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUpdatedAt(),
                user.getCreatedAt()
        );
    }
}
