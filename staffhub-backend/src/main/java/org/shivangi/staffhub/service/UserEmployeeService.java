package org.shivangi.staffhub.service;

import java.util.List;
import java.util.Optional;
import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.dtos.UserEmployeeDTO;
import org.shivangi.staffhub.entities.Employee;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.repository.EmployeeRepository;
import org.shivangi.staffhub.repository.UserRepository;
import org.shivangi.staffhub.exceptions.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.shivangi.staffhub.exceptions.ResourceNotFoundException;
import org.shivangi.staffhub.entities.Role; 
import org.shivangi.staffhub.repository.RoleRepository;

@Service
public class UserEmployeeService {
   
   @Autowired
     private EmployeeRepository employeeRepository;

     @Autowired
     private UserRepository userRepository;

     @Autowired
     private RoleRepository roleRepository;
     @Autowired
     private PasswordEncoder passwordEncoder;   

     @Transactional
     public RegisterUserDto createUserWithEmployee(RegisterUserDto dto) {
         //validate
         if(userRepository.existsByUsername(dto.getUsername())) {
          throw new UserAlreadyExistsException("Username already exists");
         }

         Role role = roleRepository.findByName(dto.getRole())
               .orElseThrow(() -> new RuntimeException("Role not found: " + dto.getRole()));

         //create User
         User user = new User();
         user.setUsername(dto.getUsername());
         user.setEmail(dto.getEmail());
         user.setPassword(passwordEncoder.encode(dto.getPassword()));
          user.setRole(role);
         //save user
         user = userRepository.save(user);

         //create Employee and set all attribute values
         Employee employee = new Employee();
         employee.setFirstName(dto.getFirstName());
         employee.setLastName(dto.getLastName());
         employee.setDepartment(dto.getDepartment());
         employee.setDesignation(dto.getDesignation());
         employee.setUser(user);
         
         //save employee
         employee = employeeRepository.save(employee);

         //set Employee ID in dto 
        //  dto.setId(employee.getId()); 
         return dto;
        
     }

     @Transactional
     public UserEmployeeDTO updateUserEmployee(Long id , UserEmployeeDTO dto) {
      

        // Fetch existing user 
        User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
           

          
        //Fetch existing employee
       Employee employee = employeeRepository.findById(id)
              .orElseThrow(() -> new ResourceNotFoundException("Employee not found")
            );
          
          

           if(dto.getEmail() != null) {
            user.setEmail(dto.getEmail());
           }   

           if(dto.getDepartment() != null) {
            employee.setDepartment(dto.getDepartment());
           }

            if(dto.getDesignation() != null) {
                employee.setDesignation(dto.getDesignation());
              }
            
            if(dto.getFirstName() != null) {
                employee.setFirstName(dto.getFirstName());
              }

            if(dto.getLastName() != null) {
                employee.setLastName(dto.getLastName());
              }

            if(dto.getUsername() != null) {
                user.setUsername(dto.getUsername());
              }

            if(dto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(dto.getPassword()));
              }
             
              userRepository.save(user);
              employeeRepository.save(employee);

            
        //Return the updated DTO
        return dto;
     }
     

     @Transactional
     public UserEmployeeDTO getUserEmployeeById(Long id) {

        User user = userRepository.findById(id)
           .orElseThrow(() -> new ResourceNotFoundException("User not found"));
         
        Employee employee = employeeRepository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
             
        UserEmployeeDTO dto = new  UserEmployeeDTO();
        // dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setDepartment(employee.getDepartment());
        dto.setDesignation(employee.getDesignation());

        return dto ;
        
     }

     @Transactional
     public void deleteUserEmployee(Long id) {
      User user = userRepository.findById(id)
           .orElseThrow(() -> new ResourceNotFoundException("User not found"));
       
      employeeRepository.findById(id).ifPresent(employeeRepository::delete);
      userRepository.deleteById(id);
      
      
     }

    
} 
