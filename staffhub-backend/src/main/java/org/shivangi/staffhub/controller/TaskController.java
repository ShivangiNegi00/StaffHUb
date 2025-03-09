package org.shivangi.staffhub.controller;

import java.util.List;
// import java.util.stream.Collectors;

import org.shivangi.staffhub.entities.Task;
import org.shivangi.staffhub.entities.User;
import org.shivangi.staffhub.repository.TaskRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.shivangi.staffhub.dtos.TaskDto;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepo taskRepo;

    public TaskController(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTaskByUser(@PathVariable String userId) {
        Integer id = Integer.parseInt(userId);
        List<Task> tasks = taskRepo.findByUserId(id);

         return tasks;
    }

    @PostMapping("/add")
    public ResponseEntity<TaskDto> addTask(@RequestBody Task task, @AuthenticationPrincipal User user){
        task.setUser(user);
        Task savedTask = taskRepo.save(task);
        TaskDto taskDto = new TaskDto(savedTask.getId(),savedTask.getTaskName(),savedTask.getDueDate(),savedTask.getRemarks());
        return ResponseEntity.ok(taskDto);
    }
   
    @PutMapping("/update/{id}")
    public String putMethodName(@PathVariable String id, @RequestBody Task updatedTask) {
        Long taskId = Long.valueOf(id);

       
        Task task = taskRepo.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTaskName(updatedTask.getTaskName());
        task.setDueDate(updatedTask.getDueDate());
        task.setRemarks(updatedTask.getRemarks());
        taskRepo.save(task);
        
        return "Task updated";
    }

    @DeleteMapping("/delete/{id}")
        public ResponseEntity<String> deleteTask(@PathVariable Long id)
       { 
        taskRepo.deleteById(id);
        return ResponseEntity.ok("Task deleted");
    }

    @PutMapping("/complete/{id}") 
        public ResponseEntity<String> completeTask(@PathVariable Long id)
         {
         Task task = taskRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
            
         task.setCompleted(!task.isCompleted());  
            taskRepo.save(task);

                
            return ResponseEntity.ok("Task completed");
        }
    
    
}
