package org.shivangi.staffhub.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.shivangi.staffhub.service.UserEmployeeService;
import org.shivangi.staffhub.repository.UserRepository;
import org.shivangi.staffhub.dtos.UserEmployeeDTO;
import java.util.List;

import org.shivangi.staffhub.entities.User;

@RequestMapping("/auth/useremployee")
@RestController
public class UserEmployeeController {
   
    @Autowired 
   private UserEmployeeService userEmployeeService;

  
   @GetMapping("/{id}")
   public ResponseEntity<UserEmployeeDTO> getUserEmployeeByID(@PathVariable Long id) {
            UserEmployeeDTO dto = userEmployeeService.getUserEmployeeById(id);
            return ResponseEntity.ok(dto);
   }

   @PutMapping("/{id}")
   public ResponseEntity<UserEmployeeDTO> updateUserEmployee(@PathVariable Long id, @RequestBody UserEmployeeDTO dto) {
     UserEmployeeDTO updatedUser = userEmployeeService.updateUserEmployee(id, dto);
     return ResponseEntity.ok(updatedUser);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteUserEmployee(@PathVariable Long id) {
      userEmployeeService.deleteUserEmployee(id);
      return ResponseEntity.noContent().build();
   }
}
