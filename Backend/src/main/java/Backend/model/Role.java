package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private String title;
    private String description;
    private String imageUrl; // Stores the path to the image
    private List<String> permissions;

    // Constructors
    public Role() {}

    public Role(String title, String description, String imageUrl, List<String> permissions) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.permissions = permissions;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public List<String> getPermissions() { return permissions; }
    public void setPermissions(List<String> permissions) { this.permissions = permissions; }
}