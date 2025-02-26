package org.shivangi.staffhub.controller;

import org.shivangi.staffhub.dtos.LoginUserDto;
import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.service.AuthenticationService;
import org.shivangi.staffhub.service.JwtService;
import org.shivangi.staffhub.responses.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
     
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User user = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime()).setUserId(authenticatedUser.getId());

        return ResponseEntity.ok(loginResponse);
    }
}
