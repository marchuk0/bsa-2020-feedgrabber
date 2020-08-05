package com.feed_grabber.core.user;

import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<UUID> createUser(UserCreateDto userDto) {
        try {
            //var user = User.fromDto(userDto);
            var user = new User(userDto.getId(), userDto.getEmail(), userDto.getUsername(), userDto.getPassword(), new ArrayList<>(), new ArrayList<>(), null);
            var result = userRepository.save(user);
            return Optional.of(result.getId());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<UserDto> getUserById(UUID id) {
        return userRepository.findById(id).map(UserDto::fromEntity);
    }

    public List<UserDto> getUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> updateUser(UUID id, UserDto userDto) {
        var userToUpdate = userRepository.getOne(id);
        userToUpdate.setEmail(userDto.getEmail());
        userToUpdate.setPassword(userDto.getPassword());
        userToUpdate.setUsername(userDto.getUsername());
        userRepository.save(userToUpdate);
        return Optional.of(UserDto.fromEntity(userToUpdate));
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
