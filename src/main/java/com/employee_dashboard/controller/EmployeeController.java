package com.employee_dashboard.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_dashboard.model.Employee;
import com.employee_dashboard.service.EmployeeService;

@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")
    public List<Employee> getEmployees() throws IOException {
        return employeeService.getAllEmployees();
    }

    @PostMapping("/save")
    public String saveEmployees(@RequestBody List<Employee> employees) throws IOException {
        employeeService.saveEmployees(employees);
        return "Saved successfully";
    }

    @PostMapping("/add")
    public String addEmployee(@RequestBody Employee employee) throws IOException {
        employeeService.appendEmployee(employee);
        return "Added successfully";
    }
}
