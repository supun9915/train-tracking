package com.tracker.tracker.services.impl;

import com.tracker.tracker.models.entities.Price;
import com.tracker.tracker.models.entities.Schedule;
import com.tracker.tracker.models.entities.Station;
import com.tracker.tracker.models.entities.TrainStation;
import com.tracker.tracker.models.request.FindPriceRequest;
import com.tracker.tracker.repositories.PriceRepository;
import com.tracker.tracker.repositories.ScheduleRepository;
import com.tracker.tracker.services.IPriceService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PriceService implements IPriceService {
  private ScheduleRepository scheduleRepository;
  private PriceRepository priceRepository;

  @Override
  public double findPrice(FindPriceRequest findPriceRequest) {
    double totalPrice = 0;
    Schedule schedule = scheduleRepository.findById(findPriceRequest.getSchedule()).get();
    Price price = priceRepository.findByTrainClass(findPriceRequest.getTrainClass());
    List<TrainStation> fromStation =
        schedule.getTrain()
            .getTrainStations()
            .stream()
            .filter(trainStation -> trainStation.getStation().getId().equals(findPriceRequest.getFromStation())).collect(
                Collectors.toList());
    List<TrainStation> toStation =
        schedule.getTrain()
            .getTrainStations()
            .stream()
            .filter(trainStation -> trainStation.getStation().getId().equals(findPriceRequest.getToStation())).collect(
                Collectors.toList());

    int trainStations = 0;

    if(fromStation.size() > 0 && toStation.size() > 0){
      trainStations = toStation.get(0).getStationOrder() - fromStation.get(0).getStationOrder();
    }

    if(trainStations > 0){
      totalPrice = (price.getPrice() * findPriceRequest.getPassengerCount()) * trainStations;
    }

    return totalPrice;
  }
}
