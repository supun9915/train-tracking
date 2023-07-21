package com.tracker.tracker.models.response;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class ScheduleGetResponse {
    private UUID id;
    private UUID depStationId;
    private UUID arrStationId;
    private OffsetDateTime departureTime;
    private OffsetDateTime arrivalTime;
    private OffsetDateTime delay;
    private UUID locationId;
    private UUID trainId;
}
