package org.shivangi.staffhub.service;
import org.shivangi.staffhub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.entities.Role;
import org.shivangi.staffhub.entities.RoleEnum;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;

    }

    public User createManager(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.MANAGER);

        if(optionalRole.isEmpty()) {
            return null;
        }

        var user = new User();
                    user .setFullName(input.getFullName());
                    user .setEmail(input.getEmail());
                     user.setPassword(passwordEncoder.encode(input.getPassword()));
                     user.setRole(optionalRole.get());

    return userRepository.save(user);

    }

}
