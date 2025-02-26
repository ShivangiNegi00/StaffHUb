package org.shivangi.staffhub.controller;

// import java.util.ArrayList;
import java.util.List;

import org.shivangi.staffhub.entities.Employee;
import org.shivangi.staffhub.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000/")  // connect the react app here 
    public class EmpController {
    
    // dependancy injecttion
    @Autowired
    private EmployeeService employeeService ;

    @GetMapping("employees")
    public List<Employee> getAllEmployees(){
        return employeeService.readEmployees();
    }

    @GetMapping("employees/{id}")
    public Employee getEmployeeById(@PathVariable Long id){
        return employeeService.readEmployee(id);
    }

    @PostMapping("employees")
    public String createEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
        
    }  

    @DeleteMapping("employees/{id}")
    public  String deleteEmployee(@PathVariable Long id){
        if(employeeService.deleteEmployee(id))
           return "Delete Successfully";
        return "Not found";
    }

   @PutMapping("employees/{id}")
   public String putMethodName(@PathVariable Long id, @RequestBody Employee employee){
      return employeeService.updateEmployee(id,employee);
   } 

}
 
    

