package com.tracker.tracker.services;

import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.response.PromoGetResponse;
import com.tracker.tracker.models.response.ScheduleResponse;

import java.security.Principal;
import java.util.List;

public interface IPromoService {

    List<PromoGetResponse> getAllPrices();

    PromoGetResponse deleteSchedule(DeleteRequest deleteRequest, Principal principal);

    PromoGetResponse createPromo(PromoGetResponse createPromo, Principal principal);
}
