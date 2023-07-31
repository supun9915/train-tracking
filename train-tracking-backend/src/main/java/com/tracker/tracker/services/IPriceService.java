package com.tracker.tracker.services;

import com.tracker.tracker.models.request.FindPriceRequest;

public interface IPriceService {

  double  findPrice(FindPriceRequest findPriceRequest);
}
