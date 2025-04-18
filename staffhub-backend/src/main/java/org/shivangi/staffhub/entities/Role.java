package org.shivangi.staffhub.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name="roles")
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable=false)
    private Integer id;

    @Column(unique = true,nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum name;

    @Column(nullable = false) 
    private String description;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
   
  public Role setName(RoleEnum name) {
        this.name = name;
        return this;
    }

    public Role setDescription(String description) {
        this.description = description;
        return this;
    }


    
}
