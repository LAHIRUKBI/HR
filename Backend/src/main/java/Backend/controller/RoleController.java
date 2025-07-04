package Backend.controller;

import Backend.model.Role;
import Backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;

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
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("permissions") List<String> permissions) {

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

            Role role = new Role(title, description, imageUrl, permissions);
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
}