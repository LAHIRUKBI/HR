package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private String title;
    private String name;
    private String description;
    private String imageUrl; // Stores the path to the image
    

    // Constructors
    public Role() {}

    public Role(String title, String name, String description, String imageUrl) {
        this.title = title;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getName() { return name; }
    public void getName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}