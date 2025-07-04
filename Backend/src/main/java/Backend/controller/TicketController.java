package Backend.controller;

import Backend.model.TicketModel;
import Backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody TicketModel ticket) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate message length
            if (ticket.getMessage() == null || ticket.getMessage().isEmpty()) {
                response.put("error", "Message is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (ticket.getMessage().length() > 50) {
                response.put("error", "Message cannot exceed 50 characters");
                return ResponseEntity.badRequest().body(response);
            }
            
            TicketModel savedTicket = ticketRepository.save(ticket);
            response.put("message", "Ticket created successfully");
            response.put("ticket", savedTicket);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("error", "Failed to create ticket: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }


@GetMapping("/employee/{employeeId}")
public ResponseEntity<?> getTicketsByEmployeeId(@PathVariable String employeeId) {
    Map<String, Object> response = new HashMap<>();
    try {
        List<TicketModel> tickets = ticketRepository.findByEmployeeId(employeeId);
        response.put("tickets", tickets);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        response.put("error", "Failed to fetch tickets: " + e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}


@GetMapping
public ResponseEntity<?> getAllTickets() {
    Map<String, Object> response = new HashMap<>();
    try {
        List<TicketModel> tickets = ticketRepository.findAll();
        response.put("tickets", tickets);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        response.put("error", "Failed to fetch tickets: " + e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}



// Add this to TicketController.java
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteTicket(@PathVariable String id) {
    Map<String, Object> response = new HashMap<>();
    
    try {
        if (!ticketRepository.existsById(id)) {
            response.put("error", "Ticket not found with id: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        
        ticketRepository.deleteById(id);
        response.put("message", "Ticket deleted successfully");
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        response.put("error", "Failed to delete ticket: " + e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}
}