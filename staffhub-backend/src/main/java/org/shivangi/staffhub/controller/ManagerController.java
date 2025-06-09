
package org.shivangi.staffhub.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.dtos.UserEmployeeDTO;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.service.UserEmployeeService;
import org.shivangi.staffhub.dtos.RegisterUserDto;


@RequestMapping("/manager")
@RestController

public class ManagerController {
    private final UserEmployeeService userService;
    public ManagerController(UserEmployeeService userService) {
        this.userService = userService;

    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<RegisterUserDto> createManager(@RequestBody RegisterUserDto dto) {
        RegisterUserDto createdManager = userService.createUserWithEmployee(dto);
        return ResponseEntity.ok(createdManager);
    }

}
