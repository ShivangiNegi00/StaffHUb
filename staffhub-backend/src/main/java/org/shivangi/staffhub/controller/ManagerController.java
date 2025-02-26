package org.shivangi.staffhub.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.service.UserService;


@RequestMapping("/manager")
@RestController

public class ManagerController {
    private final UserService userService;
    public ManagerController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<User> createManager(@RequestBody RegisterUserDto registerUserDto){
        User createdManager = userService.createManager(registerUserDto);
        return ResponseEntity.ok(createdManager);
    }

}
