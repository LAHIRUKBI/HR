package Backend.repository;

import Backend.model.TicketModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<TicketModel, String> {
    // Custom queries can be added here if needed
}