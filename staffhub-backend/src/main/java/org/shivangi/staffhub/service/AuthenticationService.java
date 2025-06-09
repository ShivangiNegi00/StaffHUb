package org.shivangi.staffhub.service;

import org.shivangi.staffhub.dtos.LoginUserDto;
import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.shivangi.staffhub.entities.Role;
import org.shivangi.staffhub.entities.RoleEnum;
import org.shivangi.staffhub.repository.RoleRepository;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public AuthenticationService(UserRepository userRepository, AuthenticationManager authenticationManager,
    RoleRepository roleRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    // public User signup(RegisterUserDto input) {
    //     Optional<Role> optionalRole = roleRepository.findByName(input.getRole());
    
    //     if(optionalRole.isEmpty()){
    //         return null;
    //     }
    //     User user = new User();
        
    //     user.setEmail(input.getEmail());
    //     user.setPassword(passwordEncoder.encode(input.getPassword()));
    //     user.setFullName(input.getFullName());
    //     user.setRole(optionalRole.get());
        
    //    return  userRepository.save(user);
    
    // }

    public User authenticate(LoginUserDto input){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
        
        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }
    

}
