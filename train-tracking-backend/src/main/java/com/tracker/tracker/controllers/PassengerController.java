package com.tracker.tracker.controllers;

import com.tracker.tracker.models.entities.Passenger;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.request.PassengerCreate;
import com.tracker.tracker.repositories.PassengerRepository;
import com.tracker.tracker.repositories.UserRepository;
import com.tracker.tracker.services.IPassengerService;
import java.security.Principal;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/passenger")
public class PassengerController {
  private final UserRepository userRepository;
  private final IPassengerService passengerService;
  private final PassengerRepository passengerRepository;

  @PostMapping("/create")
  public ResponseEntity<?> createPassenger(@Valid @RequestBody PassengerCreate createPassenger) {
    if (userRepository.findByUsername(createPassenger.getUsername()).isPresent()) {
      return new ResponseEntity<>("Username already exits.", HttpStatus.BAD_REQUEST);
    } else {
      return ResponseEntity.ok(passengerService.passengerCreate(createPassenger));
    }
  }

  @PreAuthorize("hasAnyAuthority('Super Admin','Passenger')")
  @GetMapping("/get")
  public ResponseEntity<?> getAllPassenger(@RequestParam(value = "passengerId", required = false)UUID passengerId){
    if (passengerId != null) {
      return ResponseEntity.ok(passengerService.getPassenger(passengerId));
    } else {
      return ResponseEntity.ok(passengerService.getAllPassenger());
    }
  }

  @PreAuthorize("hasAnyAuthority('Super Admin','Passenger')")
  @PutMapping("/update/{id}")
  public ResponseEntity<?> updatePassenger(@PathVariable UUID id,
      @Valid @RequestBody PassengerCreate createPassenger,
      Principal principal) {
    Passenger passenger = passengerRepository.getById(id);
    Users user = userRepository.getById(passenger.getUser().getId());

    if (!user.getUsername().equals(createPassenger.getUsername()) && userRepository.findByUsername(createPassenger.getUsername()).isPresent()) {
      return new ResponseEntity<>("Username already exits.", HttpStatus.BAD_REQUEST);
    } else {
      return ResponseEntity.ok(passengerService.passengerUpdate(id, createPassenger, principal));
    }
  }
}
