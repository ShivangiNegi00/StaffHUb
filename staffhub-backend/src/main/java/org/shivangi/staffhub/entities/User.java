package org.shivangi.staffhub.entities;

import jakarta.persistence.*;  // jakarta.persistence is used for JPA
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
// import org.shivangi.staffhub.dtos.RegisterUserDto;
import org.shivangi.staffhub.entities.Role;

import java.util.Date;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Table( name="users")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor


public class User implements UserDetails { // UserDetails is an interface which is implemented by User class
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false) // this column cannot be null applied on id
    private Integer id;

    @Column(nullable = false )
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @CreationTimestamp // this will automatically set the time when the user is created
    @Column(updatable = false, name="created_at") // this will not allow to update the time and name is changed to created_at
    private Date createdAt;

    @UpdateTimestamp // this will automatically set the time when the user is updated
    @Column(name="updated_at") // name is changed to updated_at
    private Date updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){ // returns collection of granted authorities which is a list of roles
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName().toString());
        
        return List.of(authority); // this will return an empty list
    }
    
    @Override
    public String getPassword(){ // this will return the password of the user from the database
        return password;
    }

    @Override
    public String getUsername(){
        return email; // this will return the email of the user from the database 
    }

    @Override
    public boolean isAccountNonExpired(){
        return true; // this will return true if the account is not expired
    }

    @Override 
    public boolean isAccountNonLocked(){
        return true; // this will return true if the account is not locked
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true; // this will return true if the credentials are not expired
    }

    @Override
    public boolean isEnabled(){
        return true; // this will return true if the user is enabled
    }

    @ManyToOne
    @JoinColumn(name ="role_id",referencedColumnName = "id",nullable=false)
    private Role role;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();
    
    public  Role getRole(){
        return role;
    }

    public User setRole(Role role){
        this.role = role;

        return this;
    }


}




