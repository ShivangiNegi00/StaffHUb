package org.shivangi.staffhub.service;

import java.util.List;

import org.shivangi.staffhub.dtos.UserEmployeeDTO;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.repository.EmployeeRepository;
import org.shivangi.staffhub.repository.UserRepository;
import org.shivangi.staffhub.exceptions.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
public class UserEmployeeService {
   
   @Autowired
     private EmployeeRepository employeeRepository;

     @Autowired
     private UserRepository userRepository;  

     @Autowired
     private PasswordEncoder passwordEncoder;

     @Transactional
     public UserEmployeeDTO createUserWithEmployee(UserEmployeeDTO dto) {
         //validate
         if(userRepository.existsByUsername(dto.getUsername())) {
          throw new UserAlreadyExistsException("Username already exists");
         }

         //create User
         User user = new User();
         user.setUsername(dto.getUsername());
         user.setEmail(dto.getEmail());
         

        
     }
    
} 
