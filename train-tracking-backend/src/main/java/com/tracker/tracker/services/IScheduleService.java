package com.tracker.tracker.services;

import com.tracker.tracker.models.request.CreateSchedule;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.response.ScheduleGetResponse;
import com.tracker.tracker.models.response.ScheduleResponse;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

public interface IScheduleService {
    ScheduleResponse createSchedule(CreateSchedule createSchedule, Principal principal);

    ScheduleResponse updateSchedule(UUID id, CreateSchedule createSchedule, Principal principal);

    List<ScheduleGetResponse> getSchedule(UUID scheduleId);

    List<ScheduleGetResponse> getAllSchedule();

    ScheduleResponse deleteSchedule(DeleteRequest deleteRequest, Principal principal);
}
