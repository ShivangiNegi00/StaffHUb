package org.shivangi.staffhub.controller;

import org.shivangi.staffhub.dtos.LoginUserDto;
import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.dtos.UserEmployeeDTO;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.service.AuthenticationService;
import org.shivangi.staffhub.service.JwtService;
import org.shivangi.staffhub.responses.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.shivangi.staffhub.service.UserEmployeeService;
import org.shivangi.staffhub.dtos.UserEmployeeDTO;
import org.springframework.beans.factory.annotation.Autowired;


@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final UserEmployeeService userEmployeeService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserEmployeeService userEmployeeService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userEmployeeService = userEmployeeService;
    }

     @PostMapping ("/signup")
   public ResponseEntity<RegisterUserDto> createUserEmployee(@RequestBody RegisterUserDto dto) {
        RegisterUserDto createdAccount = userEmployeeService.createUserWithEmployee(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
   }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime()).setUserId(authenticatedUser.getId());

        return ResponseEntity.ok(loginResponse);
    }
}
