package org.shivangi.staffhub.dtos;



import org.shivangi.staffhub.entities.Employee;
import org.shivangi.staffhub.entities.Role;
import org.shivangi.staffhub.entities.User;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor 

public class UserEmployeeDTO{
    
     private Long id;
     private String username;
     private String email;
     private String password;
     private String role;

     //Employee Details
     // private Long employeeId;
     private String firstName;
     private String lastName;
     private String department;
     private String designation;
}
 