package com.tracker.tracker.services.impl;

import com.tracker.tracker.auth.UserDetailServiceImpl;
import com.tracker.tracker.models.entities.Passenger;
import com.tracker.tracker.models.response.PassengerGetResponse;
import com.tracker.tracker.repositories.PassengerRepository;
import com.tracker.tracker.models.entities.Role;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.request.PassengerCreate;
import com.tracker.tracker.models.response.PassengerResponse;
import com.tracker.tracker.repositories.RoleRepository;
import com.tracker.tracker.repositories.UserRepository;
import com.tracker.tracker.services.IPassengerService;
import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PassengerService implements IPassengerService {
  private final UserDetailServiceImpl userDetailsService;
  private final UserRepository usersRepository;
  private final RoleRepository roleRepository;
  private final UserService userService;
  private final PassengerRepository passengerRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Override
  public PassengerResponse passengerCreate(PassengerCreate passengerRequest) {
    Role role = roleRepository.findByName("Passenger");
    Set<Role> roles = new HashSet<>();
    roles.add(role);

    Users userCreateRequest = new Users();
    userCreateRequest.setName(passengerRequest.getName());
    userCreateRequest.setUsername(passengerRequest.getUsername());
    userCreateRequest.setPassword(passwordEncoder.encode(passengerRequest.getPassword()));
    userCreateRequest.setEmail(passengerRequest.getEmail());
    userCreateRequest.setRoles(roles);
    Users newUser = usersRepository.save(userCreateRequest);

    Passenger newPassenger =new Passenger();
    newPassenger.setCreatedTime(OffsetDateTime.now());
    newPassenger.setContact(passengerRequest.getContact());
    newPassenger.setNic(passengerRequest.getNic());
    newPassenger.setCreatedBy(newUser);
    return PassengerResponseConvertor(passengerRepository.save(newPassenger));
  }

  @Override
  public PassengerResponse passengerUpdate(UUID id, PassengerCreate passengerRequest,
      Principal principal) {
    Passenger passenger = passengerRepository.getById(id);
    Role role = roleRepository.findByName("Passenger");
    Set<Role> roles = new HashSet<>();
    roles.add(role);

    Users userCreateRequest = passenger.getUser();
    userCreateRequest.setName(passengerRequest.getName());
    userCreateRequest.setUsername(passengerRequest.getUsername());
    userCreateRequest.setPassword(passwordEncoder.encode(passengerRequest.getPassword()));
    userCreateRequest.setEmail(passengerRequest.getEmail());
    userCreateRequest.setRoles(roles);
    Users newUser = usersRepository.save(userCreateRequest);

    passenger.setCreatedTime(OffsetDateTime.now());
    passenger.setContact(passengerRequest.getContact());
    passenger.setNic(passengerRequest.getNic());
    passenger.setCreatedBy(newUser);
    return PassengerResponseConvertor(passengerRepository.save(passenger));
  }

  @Override
  public PassengerGetResponse getPayment(UUID passengerId) {
    Passenger passenger = passengerRepository.getById(passengerId);
    PassengerGetResponse passengerGetResponse = new PassengerGetResponse();
    passengerGetResponse.setName(passenger.getUser().getName());
    passengerGetResponse.setUsername(passengerGetResponse.getUsername());
    passengerGetResponse.setEmail(passengerGetResponse.getEmail());
    passengerGetResponse.setContact(passenger.getContact());
    passengerGetResponse.setContact(passenger.getContact());
    passengerGetResponse.setNic(passenger.getNic());
    return passengerGetResponse;
  }

  @Override
  public List<PassengerGetResponse> getAllPayment() {
    List<PassengerGetResponse> passengerGetResponses = new ArrayList<>();
    List<Passenger> passengers = passengerRepository.findAll();

    for (Passenger passenger:passengers) {
      PassengerGetResponse passengerGetResponse = new PassengerGetResponse();
      passengerGetResponse.setName(passenger.getUser().getName());
      passengerGetResponse.setUsername(passengerGetResponse.getUsername());
      passengerGetResponse.setEmail(passengerGetResponse.getEmail());
      passengerGetResponse.setContact(passenger.getContact());
      passengerGetResponse.setContact(passenger.getContact());
      passengerGetResponse.setNic(passenger.getNic());
      passengers.add(passenger);
    }

    return passengerGetResponses;
  }

  private PassengerResponse PassengerResponseConvertor(Passenger passenger) {
    PassengerResponse response = new PassengerResponse();
    response.setId(passenger.getId());
    return response;
  }
}
