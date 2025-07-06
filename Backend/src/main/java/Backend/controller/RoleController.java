package Backend.controller;

import Backend.model.Role;
import Backend.repository.RoleRepository;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    private final String uploadDir = "G:/Project/HR/Backend/uploads/roles/";

@PostMapping("/create")
public ResponseEntity<?> createRole(
        @RequestParam("title") String title,
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("email") String email,
        @RequestParam("password") String password,
        @RequestParam(value = "image", required = false) MultipartFile image) {

    try {
        String imageUrl = null;
        
        // Handle image upload
        if (image != null && !image.isEmpty()) {
            File folder = new File(uploadDir);
            if (!folder.exists()) folder.mkdirs();
            
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            File destination = new File(uploadDir + fileName);
            image.transferTo(destination);
            imageUrl = "http://localhost:8080/uploads/roles/" + fileName;
        }

        Role role = new Role(title, name, description, imageUrl, email, password);
        Role savedRole = roleRepository.save(role);
        
        return ResponseEntity.ok(savedRole);
        
    } catch (IOException e) {
        return ResponseEntity.internalServerError().body("Failed to upload image: " + e.getMessage());
    }
}

@GetMapping("/all")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }



    // Add to RoleController.java
@GetMapping("/search")
public List<Role> searchRoles(@RequestParam(required = false) String title) {
    if (title != null && !title.isEmpty()) {
        return roleRepository.findByTitleContainingIgnoreCase(title);
    }
    return roleRepository.findAll();
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteRole(@PathVariable String id) {
    try {
        roleRepository.deleteById(id);
        return ResponseEntity.ok().body("Role deleted successfully");
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body("Failed to delete role");
    }
}


@PostMapping("/login")
public ResponseEntity<?> loginManager(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");
    
    Role role = roleRepository.findByEmail(email);
    
    if (role == null) {
        return ResponseEntity.status(404).body(Map.of("error", "Manager not found"));
    }
    
    if (!role.getPassword().equals(password)) {
        return ResponseEntity.status(401).body(Map.of("error", "Incorrect password"));
    }
    
    // Return the complete role object
    return ResponseEntity.ok(Map.of(
        "role", role,
        "message", "Login successful"
    ));
}



@GetMapping("/{id}")
public ResponseEntity<?> getRoleById(@PathVariable String id) {
    try {
        System.out.println("Received ID: " + id); // Debug log
        
        // Verify ID is not empty
        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid ID format");
        }

        // Check if document exists
        Optional<Role> role = roleRepository.findById(id);
        if (role.isEmpty()) {
            System.out.println("No role found with ID: " + id);
            return ResponseEntity.notFound().build();
        }

        // Create response DTO
        Map<String, Object> response = new HashMap<>();
        response.put("id", role.get().getId());
        response.put("title", role.get().getTitle());
        response.put("name", role.get().getName());
        response.put("email", role.get().getEmail());
        response.put("description", role.get().getDescription());
        response.put("imageUrl", role.get().getImageUrl());

        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        System.err.println("Error in getRoleById: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.internalServerError()
                           .body("Internal server error: " + e.getMessage());
    }
}
}