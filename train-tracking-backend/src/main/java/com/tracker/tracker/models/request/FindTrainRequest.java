package com.tracker.tracker.models.request;

import java.time.OffsetDateTime;
import java.util.Date;
import java.util.UUID;
import lombok.Data;

@Data
public class FindTrainRequest {
  private UUID fromStation;
  private UUID toStation;
  private Date date;
  private UUID train_class;
  private int passengerCount;
}
