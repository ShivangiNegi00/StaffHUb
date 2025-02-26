package org.shivangi.staffhub.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor; 
import java.util.Date;



@AllArgsConstructor
@Getter
@Setter

public class TaskDto {
    private Long id;
    private String taskName;
    private Date dueDate;
    private String remarks;


}
