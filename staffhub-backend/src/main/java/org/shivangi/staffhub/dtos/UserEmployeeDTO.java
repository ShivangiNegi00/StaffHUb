package org.shivangi.staffhub.dtos;

import org.shivangi.staffhub.entities.Employee;
import org.shivangi.staffhub.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class UserEmployeeDTO{
    
     private Long id;
     private String username;
     private String email;
     private String password;

     //Employee Details
     private Long employeeId;
     private String firstName;
     private String lastName;
     private String department;
     private String designation;
}
 