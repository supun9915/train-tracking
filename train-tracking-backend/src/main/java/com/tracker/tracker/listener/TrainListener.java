package com.tracker.tracker.listener;

import com.tracker.tracker.models.entities.Train;
import javax.persistence.PostPersist;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class TrainListener {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostPersist
    public void onChange(final Train train){
      System.out.println("Works ... !!!");
    }
}
