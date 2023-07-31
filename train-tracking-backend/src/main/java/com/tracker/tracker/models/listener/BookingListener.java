package com.tracker.tracker.models.listener;

import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;


@RequiredArgsConstructor
public class BookingListener {
  private final SimpMessagingTemplate simpMessagingTemplate;

  @PostPersist
  @PostUpdate
  @PostRemove
  void onChangeBooking(){
      simpMessagingTemplate.convertAndSend("chart/booking");
  }
}
