package com.tracker.tracker.repositories;

import com.tracker.tracker.models.entities.Passenger;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, UUID> {

  Passenger findByUser_Id(UUID id);

}