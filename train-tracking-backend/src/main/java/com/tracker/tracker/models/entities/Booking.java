package com.tracker.tracker.models.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private UUID id;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "booking_id")
  private List<Reservation> reservations = new ArrayList<>();
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "passenger_id")
  private Passenger passenger;
  private String ticket_number;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "travel_from_id")
  private Station travel_from;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "travel_to_id")
  private Station travel_to;
  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "payment_id")
  private Payment payment;
}
