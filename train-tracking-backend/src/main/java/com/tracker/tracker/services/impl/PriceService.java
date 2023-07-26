package com.tracker.tracker.services.impl;

import com.tracker.tracker.models.entities.Schedule;
import com.tracker.tracker.models.request.FindPriceRequest;
import com.tracker.tracker.repositories.ScheduleRepository;
import com.tracker.tracker.services.IPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PriceService implements IPriceService {
  private ScheduleRepository scheduleRepository;

  @Override
  public double findPrice(FindPriceRequest findPriceRequest) {
    Schedule schedule = scheduleRepository.findById(findPriceRequest.getSchedule()).get();
    return 0;
  }
}
