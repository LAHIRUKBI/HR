package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "departments")
public class DepartmentModel {
    
    @Id
    private String id;
    
    private String name;
    private String code;
    private String managerId; // Reference to employee who manages this department
    private String location;
    private String description;
    private List<String> employeeIds; // List of employees in this department
    private double budget;
    
    // Constructors
    public DepartmentModel() {}

    public DepartmentModel(String name, String code, String managerId, String location, 
                          String description, List<String> employeeIds, double budget) {
        this.name = name;
        this.code = code;
        this.managerId = managerId;
        this.location = location;
        this.description = description;
        this.employeeIds = employeeIds;
        this.budget = budget;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getEmployeeIds() {
        return employeeIds;
    }

    public void setEmployeeIds(List<String> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }
}