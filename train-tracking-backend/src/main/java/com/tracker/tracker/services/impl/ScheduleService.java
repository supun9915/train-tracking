package com.tracker.tracker.services.impl;

import com.tracker.tracker.auth.UserDetailServiceImpl;
import com.tracker.tracker.auth.UserDetailsImpl;
import com.tracker.tracker.models.entities.Schedule;
import com.tracker.tracker.models.entities.Station;
import com.tracker.tracker.models.entities.Train;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.request.CreateSchedule;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.request.FindTrainRequest;
import com.tracker.tracker.models.response.ScheduleGetResponse;
import com.tracker.tracker.models.response.ScheduleResponse;
import com.tracker.tracker.repositories.*;
import com.tracker.tracker.repositories.ScheduleRepository;
import com.tracker.tracker.services.IScheduleService;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ScheduleService implements IScheduleService {
    private final UserRepository usersRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserDetailServiceImpl userDetailsService;
    private final StationRepository stationRepository;
    private final TrainRepository trainRepository;
    @Override
    public ScheduleResponse createSchedule(CreateSchedule createSchedule, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();

        Schedule newSchedule =new Schedule();
        Station depSt = stationRepository.getById(createSchedule.getDepStationId());
        newSchedule.setDepartureStation(depSt);
        Station arvSt = stationRepository.getById(createSchedule.getDepStationId());
        newSchedule.setArrivalStation(arvSt);
        newSchedule.setDepartureTime(createSchedule.getDepartureTime());
        newSchedule.setArrivalTime(createSchedule.getArrivalTime());
        newSchedule.setDelay(createSchedule.getDelay());
        Train train = trainRepository.getById(createSchedule.getTrainId());
        newSchedule.setTrain(train);
        Station location = stationRepository.getById(createSchedule.getLocationId());
        newSchedule.setLocation(location);
        newSchedule.setCreatedBy(user);
        newSchedule.setCreatedTime(OffsetDateTime.now());
        newSchedule.setModifiedTime(OffsetDateTime.now());
        return ScheduleResponseConvertor(scheduleRepository.save(newSchedule));
    }

    @Override
    public ScheduleResponse updateSchedule(UUID id, CreateSchedule createSchedule, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Schedule updateSchedule = scheduleRepository.findById(id).get();
        Station depSt = stationRepository.getById(createSchedule.getDepStationId());
        updateSchedule.setDepartureStation(depSt);
        Station arvSt = stationRepository.getById(createSchedule.getDepStationId());
        updateSchedule.setArrivalStation(arvSt);
        updateSchedule.setDepartureTime(createSchedule.getDepartureTime());
        updateSchedule.setArrivalTime(createSchedule.getArrivalTime());
        updateSchedule.setDelay(createSchedule.getDelay());
        Train train = trainRepository.getById(createSchedule.getTrainId());
        updateSchedule.setTrain(train);
        Station location = stationRepository.getById(createSchedule.getLocationId());
        updateSchedule.setLocation(location);
        updateSchedule.setModifiedBy(user);
        updateSchedule.setModifiedTime(OffsetDateTime.now());
        return ScheduleResponseConvertor(scheduleRepository.save(updateSchedule));
    }

    @Override
    public List<ScheduleGetResponse> getSchedule(UUID trainId) {
        List<ScheduleGetResponse> stationGetResponses = new ArrayList<>();
        {
            if (scheduleRepository.findAll().size()>0) {
                stationGetResponses.add(stationGetResponsesConverter(scheduleRepository.findById(trainId).get()));
            }
        }
        return stationGetResponses;
    }

    @Override
    public List<ScheduleGetResponse> getAllSchedule() {
        List<ScheduleGetResponse> stationGetResponses = new ArrayList<>();

        for (Schedule train :
                scheduleRepository.findByDeletedOrderByCreatedTimeDesc(false)) {
            stationGetResponses.add(stationGetResponsesConverter(train));
        }
        return stationGetResponses;
    }

    @Override
    public ScheduleResponse deleteSchedule(DeleteRequest deleteRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Schedule DeleSchedule =
                scheduleRepository.findById(UUID.fromString(deleteRequest.getId())).get();
        DeleSchedule .setDeleted(deleteRequest.getDelete());
        DeleSchedule .setModifiedBy(user);
        DeleSchedule .setModifiedTime(OffsetDateTime.now());

        return ScheduleResponseConvertor(scheduleRepository.save(DeleSchedule));
    }

    @Override
    public List<Schedule> findTrain(FindTrainRequest findTrainRequest,
        Principal principal) {
        List<Schedule> schedules = scheduleRepository
            .findByTrain_Stations_IdAndTrain_Stations_IdAndDepartureTimeBetween(
                findTrainRequest.getFromStation(),
                findTrainRequest.getToStation(),
                findTrainRequest.getFromDate(),
                findTrainRequest.getToDate());

        List<Schedule> validSchedules = new ArrayList<>();

        switch (findTrainRequest.getTrain_class()){
            case "First":
                schedules.stream().filter(
                    schedule -> schedule.getFirstClassAvailable() >= findTrainRequest.getPassengerCount()).collect(
                    Collectors.toList()).addAll(validSchedules);
            case "Second":
                schedules.stream().filter(
                    schedule -> schedule.getSecondClassAvailable() >= findTrainRequest.getPassengerCount()).collect(
                    Collectors.toList()).addAll(validSchedules);
            case "Third":
                schedules.stream().filter(
                    schedule -> schedule.getThirdClassAvailable() >= findTrainRequest.getPassengerCount()).collect(
                    Collectors.toList()).addAll(validSchedules);
        }

        return validSchedules;
    }

    private ScheduleGetResponse stationGetResponsesConverter(Schedule schedule) {
        ScheduleGetResponse stationGetResponse = new ScheduleGetResponse();
        stationGetResponse.setId(schedule.getId());
        stationGetResponse.setDepStationId(schedule.getDepartureStation().getId());
        stationGetResponse.setArrStationId(schedule.getArrivalStation().getId());
        stationGetResponse.setDepartureTime(schedule.getDepartureTime());
        stationGetResponse.setArrivalTime(schedule.getArrivalTime());
        stationGetResponse.setDelay(schedule.getDelay());
        stationGetResponse.setTrainId(schedule.getTrain().getId());
        stationGetResponse.setLocationId(schedule.getLocation().getId());

        return stationGetResponse;
    }

    private ScheduleResponse ScheduleResponseConvertor(Schedule train) {
        ScheduleResponse stationGetResponse = new ScheduleResponse();
        stationGetResponse.setId(train.getId());
        return stationGetResponse;
    }
}
