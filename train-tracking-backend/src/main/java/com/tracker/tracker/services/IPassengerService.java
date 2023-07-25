package com.tracker.tracker.services;

import com.tracker.tracker.models.request.BookingCreate;
import com.tracker.tracker.models.request.PassengerCreate;
import com.tracker.tracker.models.response.BookingResponse;
import com.tracker.tracker.models.response.PassengerGetResponse;
import com.tracker.tracker.models.response.PassengerResponse;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

public interface IPassengerService {
  PassengerResponse passengerCreate(PassengerCreate passengerRequest);

  PassengerResponse passengerUpdate(UUID id, PassengerCreate passengerRequest, Principal principal);

  PassengerGetResponse getPayment(UUID passengerId);

  List<PassengerGetResponse> getAllPayment();
}
