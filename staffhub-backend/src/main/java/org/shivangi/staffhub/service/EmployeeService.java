package org.shivangi.staffhub.service;

import java.util.List;

import org.shivangi.staffhub.model.Employee;

public interface EmployeeService {
     String createEmployee(Employee employee);
     List<Employee> readEmployees();
     boolean deleteEmployee(Long id);
     String updateEmployee(Long id, Employee employee);
     Employee readEmployee(Long id);

    
} 
