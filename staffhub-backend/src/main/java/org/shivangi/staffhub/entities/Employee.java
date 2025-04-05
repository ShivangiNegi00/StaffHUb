package org.shivangi.staffhub.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.shivangi.staffhub.entities.User;
import jakarta.persistence.OneToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.JoinColumn;

@Data
@Entity 
@Table(name = "employees")
public class Employee {
    
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // TODO: make employee id having prefix of joining year . like 
    private Long id;
    private String firstName;
    private String  lastName;
    private String phone;
    private String designation;
    private String department;
    private String address;
    private String city;

    @OneToOne
    @MapsId // this will make the employee use the same id as the user
    @JoinColumn(name = "user_id")
    private User user;


}
