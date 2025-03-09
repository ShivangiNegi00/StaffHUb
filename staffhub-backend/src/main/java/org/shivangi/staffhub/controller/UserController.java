package org.shivangi.staffhub.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.shivangi.staffhub.service.UserService;
import org.shivangi.staffhub.repository.UserRepository;

import java.util.List;

import org.shivangi.staffhub.entities.User;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    @Autowired 
    private UserRepository userRepo;

    public UserController(UserService userService) {
        this.userService = userService;
   
    }

    @DeleteMapping("/delete/{id}") 

    public String deleteUser(@PathVariable Integer id) {
        userRepo.deleteById(id);
        return "User deleted successfully";
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('MANAGER')")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}
