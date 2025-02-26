package org.shivangi.staffhub.entities;
import java.util.Date;
import org.shivangi.staffhub.entities.User;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Getter 
@Setter 


public class Task {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName ;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

    private String remarks;
    private boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name ="user_id",nullable = false)
    private User user;
    


}
