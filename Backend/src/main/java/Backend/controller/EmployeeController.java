package Backend.controller;

import Backend.model.EmployeeModel;
import Backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employees
    @GetMapping
    public ResponseEntity<List<EmployeeModel>> getAllEmployees() {
        return ResponseEntity.ok(employeeRepository.findAll());
    }

    // Get single employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable String id) {
        Optional<EmployeeModel> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create new employee
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

    // Update employee
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable String id, @RequestBody EmployeeModel employeeDetails) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<EmployeeModel> employeeOptional = employeeRepository.findById(id);
            if (!employeeOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            EmployeeModel employee = employeeOptional.get();
            employee.setFirstName(employeeDetails.getFirstName());
            employee.setLastName(employeeDetails.getLastName());
            employee.setDateOfBirth(employeeDetails.getDateOfBirth());
            employee.setDepartment(employeeDetails.getDepartment());
            employee.setEmail(employeeDetails.getEmail());
            employee.setPhoneNumber(employeeDetails.getPhoneNumber());
            employee.setHireDate(employeeDetails.getHireDate());

            EmployeeModel updatedEmployee = employeeRepository.save(employee);
            response.put("message", "Employee updated successfully");
            response.put("employee", updatedEmployee);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (!employeeRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            
            employeeRepository.deleteById(id);
            response.put("message", "Employee deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}