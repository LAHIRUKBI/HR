package Backend.repository;

import Backend.model.TicketModel;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<TicketModel, String> {
    List<TicketModel> findByEmployeeId(String employeeId);
}