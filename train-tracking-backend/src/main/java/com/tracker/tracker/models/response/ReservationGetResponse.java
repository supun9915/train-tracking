package com.tracker.tracker.models.response;

import lombok.Data;

import java.util.UUID;

@Data
public class ReservationGetResponse {
    private UUID id;
    private UUID trainClassId;
    private int seatNumber;
}
