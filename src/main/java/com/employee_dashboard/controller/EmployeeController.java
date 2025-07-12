package com.employee_dashboard.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_dashboard.model.Employee;
import com.employee_dashboard.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    private static final Path JSON_PATH = Paths.get("src/main/resources/static/js/data.js");

    @GetMapping("/employees")
    public List<Employee> getEmployees() throws IOException {
        return employeeService.getAllEmployees();
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveEmployees(@RequestBody List<Employee> employees) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonContent = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(employees);
            String finalContent = "const employees = " + jsonContent + ";";
            Files.writeString(JSON_PATH, finalContent, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            return ResponseEntity.ok("Saved successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to save: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    public String addEmployee(@RequestBody Employee employee) throws IOException {
        employeeService.appendEmployee(employee);
        return "Added successfully";
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable String id, @RequestBody Employee updatedEmployee) {
        try {
            employeeService.updateEmployeeById(id, updatedEmployee);
            return ResponseEntity.ok("Employee updated successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to update: " + e.getMessage());
        }
    }

}
