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
        
        // Validate salary is not negative
        if (employee.getSalary() < 0) {
            response.put("error", "Salary cannot be negative");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Rest of your validation...
        
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
            employee.setSalary(employeeDetails.getSalary());

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




@PostMapping("/login")
public ResponseEntity<?> loginEmployee(@RequestBody Map<String, String> credentials) {
    Map<String, Object> response = new HashMap<>();
    
    try {
        String email = credentials.get("email");
        String employeeId = credentials.get("employeeId");
        
        if (email == null || email.isEmpty() || employeeId == null || employeeId.isEmpty()) {
            response.put("error", "Email and Employee ID are required");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Use Optional to handle null cases more gracefully
        Optional<EmployeeModel> employeeOpt = Optional.ofNullable(employeeRepository.findByEmail(email));
        
        if (!employeeOpt.isPresent()) {
            response.put("error", "Employee not found with this email");
            return ResponseEntity.status(404).body(response);
        }
        
        EmployeeModel employee = employeeOpt.get();
        
        if (!employee.getEmployeeId().equals(employeeId)) {
            response.put("error", "Invalid Employee ID");
            return ResponseEntity.status(401).body(response);
        }
        
        // Don't include sensitive information in the response
        EmployeeModel responseEmployee = new EmployeeModel();
        responseEmployee.setId(employee.getId());
        responseEmployee.setFirstName(employee.getFirstName());
        responseEmployee.setLastName(employee.getLastName());
        responseEmployee.setDepartment(employee.getDepartment());
        responseEmployee.setEmployeeId(employee.getEmployeeId());
        // Exclude sensitive data like salary, etc.
        
        response.put("message", "Login successful");
        response.put("employee", responseEmployee);
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        // Log the full error for debugging
        System.err.println("Login error: " + e.getMessage());
        e.printStackTrace();
        
        response.put("error", "Internal server error during login");
        return ResponseEntity.internalServerError().body(response);
    }
}
}