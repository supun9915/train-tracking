package com.tracker.tracker.services.impl;

import com.tracker.tracker.auth.UserDetailServiceImpl;
import com.tracker.tracker.auth.UserDetailsImpl;
import com.tracker.tracker.models.entities.Role;
import com.tracker.tracker.models.entities.Station;
import com.tracker.tracker.models.entities.Train;
import com.tracker.tracker.models.entities.TrainStation;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.json.IdWithName;
import com.tracker.tracker.models.json.UuidWithOrder;
import com.tracker.tracker.models.request.CreateTrain;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.request.UserCreateRequest;
import com.tracker.tracker.models.response.TrainGetResponse;
import com.tracker.tracker.models.response.TrainResponse;
import com.tracker.tracker.models.response.UserGetResponse;
import com.tracker.tracker.models.response.UserResponse;
import com.tracker.tracker.repositories.StationRepository;
import com.tracker.tracker.repositories.TrainRepository;
import com.tracker.tracker.repositories.TranStationRepository;
import com.tracker.tracker.repositories.UserRepository;
import com.tracker.tracker.services.ITrainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TrainService implements ITrainService {
    private final TrainRepository trainRepository;
    private final UserRepository usersRepository;
    private final StationRepository stationRepository;
    private final UserDetailServiceImpl userDetailsService;
    private final TranStationRepository trainStationRepository;
    @Override
    public TrainResponse createTrain(CreateTrain createTrain, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();

        Train newTrain =new Train();
        newTrain.setName(createTrain.getName());
        newTrain.setFirstClassCount(createTrain.getFirstClassCount());
        newTrain.setSecondClassCount(createTrain.getSecondClassCount());
        newTrain.setThirdClassCount(createTrain.getThirdClassCount());

        Set<TrainStation> trainStations = new HashSet<>();
        if (createTrain.getStation().size() > 0) {
            for (UuidWithOrder uuidWithOrder: createTrain.getStation()) {
                TrainStation trainStation = new TrainStation();
                Station station = stationRepository.findById(uuidWithOrder.getId()).get();
                trainStation.setStation(station);
                trainStation.setStationOrder(uuidWithOrder.getOrder());
                trainStations.add(trainStationRepository.save(trainStation));
            }
        }
        newTrain.setTrainStations(trainStations);
        newTrain.setCreatedBy(user);
        newTrain.setCreatedTime(OffsetDateTime.now());
        newTrain.setModifiedTime(OffsetDateTime.now());
        return TrainResponseConvertor(trainRepository.save(newTrain));
    }

    @Override
    public TrainResponse updateTrain(UUID id, CreateTrain createTrain, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Train updateTrain = trainRepository.findById(id).get();
        updateTrain.setName(createTrain.getName());
        updateTrain.setFirstClassCount(createTrain.getFirstClassCount());
        updateTrain.setSecondClassCount(createTrain.getSecondClassCount());
        updateTrain.setThirdClassCount(createTrain.getThirdClassCount());

        for(TrainStation trainStation  : updateTrain.getTrainStations()){
            trainStationRepository.deleteById(trainStation.getId());
        }

        Set<TrainStation> trainStations = new HashSet<>();
        if (createTrain.getStation().size() > 0) {
            for (UuidWithOrder uuidWithOrder: createTrain.getStation()) {
                TrainStation trainStation = new TrainStation();
                Station station = stationRepository.findById(uuidWithOrder.getId()).get();
                trainStation.setStation(station);
                trainStation.setStationOrder(uuidWithOrder.getOrder());
                trainStations.add(trainStationRepository.save(trainStation));
            }
        }

        updateTrain.setTrainStations(trainStations);
        updateTrain.setModifiedBy(user);
        updateTrain.setModifiedTime(OffsetDateTime.now());
        return TrainResponseConvertor(trainRepository.save(updateTrain));
    }

    @Override
    public List<TrainGetResponse> getTrain(UUID trainId) {
        List<TrainGetResponse> trainGetResponses = new ArrayList<>();
        {
            if (trainRepository.findAll().size()>0) {
                trainGetResponses.add(trainGetResponsesConverter(trainRepository.findById(trainId).get()));
            }
        }
        return trainGetResponses;
    }

    @Override
    public List<TrainGetResponse> getAllTrain() {
        List<TrainGetResponse> trainGetResponses = new ArrayList<>();

        for (Train train :
                trainRepository.findByDeletedOrderByCreatedTimeDesc(false)) {
            trainGetResponses.add(trainGetResponsesConverter(train));
        }
        return trainGetResponses;
    }

    @Override
    public TrainResponse deleteTrain(DeleteRequest deleteRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Train DeleTrain =
                trainRepository.findById(UUID.fromString(deleteRequest.getId())).get();
        DeleTrain .setDeleted(deleteRequest.getDelete());
        DeleTrain .setModifiedBy(user);
        DeleTrain .setModifiedTime(OffsetDateTime.now());

        return TrainResponseConvertor(trainRepository.save(DeleTrain));
    }

    private TrainGetResponse trainGetResponsesConverter(Train train) {
        TrainGetResponse trainGetResponse = new TrainGetResponse();
        trainGetResponse.setId(train.getId());
        trainGetResponse.setFirstClassCount(train.getFirstClassCount());
        trainGetResponse.setSecondClassCount(train.getSecondClassCount());
        trainGetResponse.setThirdClassCount(train.getThirdClassCount());
        trainGetResponse.setName(train.getName());
        trainGetResponse.setStations(train.getTrainStations());
        return trainGetResponse;
    }

    private TrainResponse TrainResponseConvertor(Train train) {
        TrainResponse trainResponse = new TrainResponse();
        trainResponse.setId(train.getId());
        trainResponse.setName(train.getName());
        return trainResponse;
    }
}
