package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "tickets")
public class TicketModel {
    
    @Id
    private String id;
    private String fullName;
    private String employeeId;
    private String email;
    private String message;
    private Date createdAt;
    private String status; // "open", "in-progress", "resolved"

    // Constructors
    public TicketModel() {
        this.createdAt = new Date();
        this.status = "open";
    }

    public TicketModel(String fullName, String employeeId, String email, String message) {
        this();
        this.fullName = fullName;
        this.employeeId = employeeId;
        this.email = email;
        this.message = message;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}