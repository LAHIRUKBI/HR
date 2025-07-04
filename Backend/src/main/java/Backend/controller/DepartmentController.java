package Backend.controller;

import Backend.model.DepartmentModel;
import Backend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    // Get all departments
    @GetMapping
    public ResponseEntity<List<DepartmentModel>> getAllDepartments() {
        return ResponseEntity.ok(departmentRepository.findAll());
    }

// Create new department
@PostMapping
public ResponseEntity<?> createDepartment(@RequestBody DepartmentModel department) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate required fields
            if (department.getName() == null || department.getName().isEmpty()) {
                response.put("error", "Department name is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (department.getCode() == null || department.getCode().isEmpty()) {
                response.put("error", "Department code is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Check if department code already exists
            if (departmentRepository.existsByCode(department.getCode())) {
                response.put("error", "Department with this code already exists");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validate budget is not negative
            if (department.getBudget() < 0) {
                response.put("error", "Budget cannot be negative");
                return ResponseEntity.badRequest().body(response);
            }
            
            DepartmentModel savedDepartment = departmentRepository.save(department);
            response.put("message", "Department created successfully");
            response.put("department", savedDepartment);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    
}