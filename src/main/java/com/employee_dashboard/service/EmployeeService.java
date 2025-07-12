package com.employee_dashboard.service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

import org.springframework.stereotype.Service;

import com.employee_dashboard.model.Employee;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmployeeService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Path jsonPath = Path.of("src/main/resources/static/js/data.js");

    public List<Employee> getAllEmployees() throws IOException {
        try {
            String raw = Files.readString(jsonPath);

            // Strip "const employees =" and ending semicolon
            String json = raw
                    .replaceFirst("^const\\s+employees\\s*=\\s*", "")
                    .replaceAll(";$", "")
                    .trim();

            return objectMapper.readValue(json, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
            return List.of(); // return empty list on error
        }
    }

    public void saveEmployees(List<Employee> employees) throws IOException {
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(employees);
        String jsExport = "const employeeData = " + json + ";";

        try (FileWriter writer = new FileWriter(jsonPath.toFile(), false)) {
            writer.write(jsExport);
        }
    }

    public void appendEmployee(Employee newEmployee) throws IOException {
        List<Employee> current = getAllEmployees();
        current.add(newEmployee);
        System.out.println(current);
        saveEmployees(current);
    }

    public void saveAllEmployees(List<Employee> employees) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(employees);
        String content = "const employees = " + json + ";";
        Path jsonPath = Paths.get("src/main/resources/static/js/data.js");
        Files.writeString(jsonPath, content, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    }

    public void updateEmployeeById(String id, Employee updatedEmployee) throws IOException {
        List<Employee> employees = getAllEmployees();
        for (int i = 0; i < employees.size(); i++) {
            if (employees.get(i).getId().equals(id)) {
                employees.set(i, updatedEmployee);
                break;
            }
        }
        saveAllEmployees(employees);
    }

}
