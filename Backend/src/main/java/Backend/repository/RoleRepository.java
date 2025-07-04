package Backend.repository;

import Backend.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RoleRepository extends MongoRepository<Role, String> {
    List<Role> findByTitleContainingIgnoreCase(String title);
}