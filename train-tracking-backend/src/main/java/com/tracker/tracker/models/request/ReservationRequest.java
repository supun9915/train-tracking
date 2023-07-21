package com.tracker.tracker.models.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ReservationRequest {
    private UUID id;
    private UUID trainClassId;
    private int seatNumber;
}
