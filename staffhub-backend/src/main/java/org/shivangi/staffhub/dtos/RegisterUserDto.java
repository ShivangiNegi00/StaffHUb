package org.shivangi.staffhub.dtos;
import org.shivangi.staffhub.entities.RoleEnum; 

public class RegisterUserDto {
    private String email;

    private String password;

    private String fullName;
    private RoleEnum role;

    public String getFullName() {

        return fullName;

    }

    public RegisterUserDto setFullName(String fullName) {

        this.fullName = fullName;

        return this;

    }

    public String getEmail() {

        return email;

    }

    public RegisterUserDto setEmail(String email) {

        this.email = email;

        return this;

    }

    public String getPassword() {

        return password;

    }

    public RegisterUserDto setPassword(String password) {

        this.password = password;

        return this;

    }

    public RoleEnum getRole() {

        return role;

    }

    public RegisterUserDto setRole(RoleEnum role) {

        this.role = role;

        return this;

    }
    
}
