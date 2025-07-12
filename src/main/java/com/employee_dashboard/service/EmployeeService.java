package com.employee_dashboard.service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.employee_dashboard.model.Employee;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmployeeService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Path jsPath = Path.of("src/main/resources/static/js/data.js");

    public List<Employee> getAllEmployees() throws IOException {
        if (!Files.exists(jsPath)) {
            return new ArrayList<>();
        }

        String content = Files.readString(jsPath);
        System.out.println(content);
        String jsonPart = content.replaceFirst("^const\\s+employeeData\\s*=\\s*", "").replaceAll(";\\s*$", "");
        System.out.println(jsonPart.toString());
        return objectMapper.readValue(jsonPart, new TypeReference<>() {
        });
    }

    public void saveEmployees(List<Employee> employees) throws IOException {
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(employees);
        String jsExport = "const employeeData = " + json + ";";

        try (FileWriter writer = new FileWriter(jsPath.toFile(), false)) {
            writer.write(jsExport);
        }
    }

    public void appendEmployee(Employee newEmployee) throws IOException {
        List<Employee> current = getAllEmployees();
        current.add(newEmployee);
        System.out.println(current);
        saveEmployees(current);
    }
}
