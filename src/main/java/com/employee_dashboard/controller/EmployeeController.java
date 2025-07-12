package com.employee_dashboard.controller;

import com.employee_dashboard.model.Employee;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
public class EmployeeController {
    @GetMapping("/")
    public String home(Model model) {
        List<Employee> employees;
        employees = List.of(new Employee(1, "Alice","Johnson", "Frontend Developer", "Engineering", "alice@example.com"), new Employee(2, "Bob","Smith", "Backend Developer", "Engineering", "bob@example.com"));
        model.addAttribute("employees", employees);
        return "index";
    }


    @PostMapping("/api/save")
    @ResponseBody
    public ResponseEntity<String> saveEmployees(@RequestBody List<Employee> employees) {
        try {
            StringBuilder sb = new StringBuilder("window.employeeData = ");
            sb.append(new ObjectMapper().writeValueAsString(employees));
            sb.append(";");

            Path path = Paths.get("src/main/resources/static/js/data.js");
            Files.write(path, sb.toString().getBytes(StandardCharsets.UTF_8));
            return ResponseEntity.ok("Saved");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed: " + e.getMessage());
        }
    }

}
