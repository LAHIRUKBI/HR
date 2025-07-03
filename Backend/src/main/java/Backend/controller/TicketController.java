package Backend.controller;

import Backend.model.TicketModel;
import Backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping
    public String createTicket(@RequestBody TicketModel ticket) {
        try {
            // Basic validation
            if (ticket.getMessage() == null || ticket.getMessage().trim().isEmpty()) {
                return "Message cannot be empty";
            }
            if (ticket.getMessage().length() > 50) {
                return "Message cannot exceed 50 characters";
            }

            // Set default values
            ticket.setStatus("Pending");
            ticket.setCreatedAt(new Date());

            // Save to database
            ticketRepository.save(ticket);
            return "Ticket submitted successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error creating ticket: " + e.getMessage();
        }
    }
}