package Backend.controller;

import Backend.model.EmployeeModel;
import Backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeModel employee) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate required fields
            if (employee.getFirstName() == null || employee.getFirstName().isEmpty()) {
                response.put("error", "First name is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validate uniqueness
            if (employeeRepository.existsByEmployeeId(employee.getEmployeeId())) {
                response.put("error", "Employee ID already exists");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (employeeRepository.existsByEmail(employee.getEmail())) {
                response.put("error", "Email already exists");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Save employee
            EmployeeModel savedEmployee = employeeRepository.save(employee);
            response.put("message", "Employee registered successfully");
            response.put("employee", savedEmployee);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}