package com.tracker.tracker.repositories;

import com.tracker.tracker.models.entities.Schedule;
import com.tracker.tracker.models.entities.Station;
import java.time.OffsetDateTime;
import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, UUID> {

    List<Schedule> findByDeletedOrderByCreatedTimeDesc(Boolean deleted);

    List<Schedule> findByTrain_TrainStations_Station_IdInAndDepartureTimeBetween(
        Collection<UUID> ids, OffsetDateTime departureTimeStart, OffsetDateTime departureTimeEnd);

    List<Schedule> findByTrain_TrainStations_IdAndTrain_TrainStations_Id(UUID id, UUID id1);

    List<Schedule> findByTrain_TrainStations_Station_Id(UUID id);

    List<Schedule> findByTrain_TrainStations_Station_IdIn(Collection<UUID> ids);


    

}
