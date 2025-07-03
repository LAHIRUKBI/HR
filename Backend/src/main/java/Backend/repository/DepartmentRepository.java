package Backend.repository;

import Backend.model.DepartmentModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends MongoRepository<DepartmentModel, String> {
    boolean existsByName(String name);
    boolean existsByCode(String code);
    DepartmentModel findByCode(String code);
}