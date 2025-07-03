package Backend.repository;

import Backend.model.EmployeeModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<EmployeeModel, String> {
    
    boolean existsByEmployeeId(String employeeId);
    boolean existsByEmail(String email);
}