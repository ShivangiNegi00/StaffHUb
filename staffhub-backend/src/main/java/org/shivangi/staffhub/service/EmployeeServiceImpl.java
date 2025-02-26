package org.shivangi.staffhub.service;
import java.util.*;

import org.shivangi.staffhub.entities.Employee;
import org.shivangi.staffhub.entities.EmployeeEntity;
import org.shivangi.staffhub.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

@Service
public class EmployeeServiceImpl implements EmployeeService {
     
    @Autowired // automatic dependency injection
    EmployeeRepository employeeRepository; // creating the object of EmployeeRepository

    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity); //copying the properties of employee to employeeEntity because we need to save the data in the database
        employeeRepository.save(employeeEntity); 
        return "Saved Successfully";
        
    }

    @Override 
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeeList = employeeRepository.findAll(); // findAll() is a method of JpaRepository and we did not use get here because we want to get all the employees
        List<Employee> employees = new ArrayList<>();

        for(EmployeeEntity employeeEntity : employeeList) {
            Employee emp = new Employee(); // set data in employee object to present on the screen
            emp.setId(employeeEntity.getId());
            emp.setName(employeeEntity.getName());
            emp.setEmail(employeeEntity.getEmail());
            emp.setPhone(employeeEntity.getPhone());

            // now add the object emp to the model employee (DTO)
            employees.add(emp); 
        }

        return employees;

    }

    @Override
    // to read info about just one employee by taking id as input
    public Employee readEmployee(Long id) {
        EmployeeEntity emp = employeeRepository.findById(id).get(); // get() method is used to get the object of EmployeeEntity  
        Employee employee = new Employee();
        BeanUtils.copyProperties(emp,employee); // copies name, email, phone from emp to employee
    
    
           return employee;
    }


    @Override
    public boolean deleteEmployee(Long id){
        EmployeeEntity emp = employeeRepository.findById(id).get();
        employeeRepository.delete(emp);
        return true;
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
        EmployeeEntity existingEmployee = employeeRepository.findById(id).get();

        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setName(employee.getName());
        existingEmployee.setPhone(employee.getPhone());

        employeeRepository.save(existingEmployee);

        return "Updated Successfully";
    }

    
}
