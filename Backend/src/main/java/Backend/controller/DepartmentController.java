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


// Get single department by code
@GetMapping("/{id}")
public ResponseEntity<?> getDepartmentById(@PathVariable String id) {
    System.out.println("Received request for department code: " + id);
    
    if (id == null || id.isEmpty()) {
        System.out.println("Invalid code received");
        return ResponseEntity.badRequest().body("Department code cannot be empty");
    }
    
    DepartmentModel department = departmentRepository.findByCode(id);
    
    if (department != null) {
        System.out.println("Found department: " + department.getName());
        return ResponseEntity.ok(department);
    } else {
        System.out.println("No department found with code: " + id);
        return ResponseEntity.notFound().build();
    }
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


// Update department
@PutMapping("/{code}")
public ResponseEntity<?> updateDepartment(@PathVariable String code, @RequestBody DepartmentModel departmentDetails) {
    Map<String, Object> response = new HashMap<>();
    try {
        DepartmentModel department = departmentRepository.findByCode(code);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }

        department.setName(departmentDetails.getName());
        department.setCode(departmentDetails.getCode());
        department.setManagerId(departmentDetails.getManagerId());
        department.setLocation(departmentDetails.getLocation());
        department.setDescription(departmentDetails.getDescription());
        department.setEmployeeIds(departmentDetails.getEmployeeIds());
        department.setBudget(departmentDetails.getBudget());

        DepartmentModel updatedDepartment = departmentRepository.save(department);
        response.put("message", "Department updated successfully");
        response.put("department", updatedDepartment);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        response.put("error", "Internal server error: " + e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}


// Delete department
@DeleteMapping("/{code}")
public ResponseEntity<?> deleteDepartment(@PathVariable String code) {
    Map<String, Object> response = new HashMap<>();
    try {
        DepartmentModel department = departmentRepository.findByCode(code);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }
        
        departmentRepository.delete(department);
        response.put("message", "Department deleted successfully");
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        response.put("error", "Internal server error: " + e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}

    
}