package com.tracker.tracker.services.impl;

import com.tracker.tracker.auth.UserDetailServiceImpl;
import com.tracker.tracker.auth.UserDetailsImpl;
import com.tracker.tracker.models.entities.Price;
import com.tracker.tracker.models.entities.Promotion;
import com.tracker.tracker.models.entities.Schedule;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.response.PromoGetResponse;
import com.tracker.tracker.models.response.ScheduleResponse;
import com.tracker.tracker.repositories.PromoRepository;
import com.tracker.tracker.repositories.UserRepository;
import com.tracker.tracker.services.IPromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PromoService implements IPromoService {
  private final PromoRepository promoRepository;
  private final UserDetailServiceImpl userDetailsService;
  private final UserRepository userRepository;


    @Override
    public List<PromoGetResponse> getAllPrices() {
        List<PromoGetResponse> promoGetResponses = new ArrayList<>();

        for (Promotion promotion :
                promoRepository.findByDeleted(false)) {
            promoGetResponses.add(promoGetResponsesConverter(promotion));
        }
        return promoGetResponses;
    }

    @Override
    public PromoGetResponse deleteSchedule(DeleteRequest deleteRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = userRepository.findById(userImpl.getId()).get();
        Promotion DeleSchedule =
                promoRepository.findById(UUID.fromString(deleteRequest.getId())).get();
        DeleSchedule .setDeleted(deleteRequest.getDelete());
        DeleSchedule .setModifiedBy(user);
        DeleSchedule .setModifiedTime(OffsetDateTime.now());

        return DeleteeResponseConvertor(promoRepository.save(DeleSchedule));

    }

    @Override
    public PromoGetResponse createPromo(PromoGetResponse createPromo, Principal principal) {
        PromoGetResponse promoGetResponse =new PromoGetResponse();
        promoGetResponse.setClas(createPromo.getClas());
        promoGetResponse.setCode(createPromo.getCode());
        promoGetResponse.setRound(createPromo.getRound());
        promoGetResponse.setDiscount(createPromo.getDiscount());
        return promoGetResponse;
    }

    private PromoGetResponse DeleteeResponseConvertor(Promotion save) {
        PromoGetResponse promoGetResponse = new PromoGetResponse();
        promoGetResponse.setId(save.getId());
        return promoGetResponse;
    }

    private PromoGetResponse promoGetResponsesConverter(Promotion promotion) {
        PromoGetResponse promoGetResponse = new PromoGetResponse();
        promoGetResponse.setId(promotion.getId());
        promoGetResponse.setClas(promotion.getClas());
        promoGetResponse.setCode(promotion.getCode());
        promoGetResponse.setRound(promotion.getRound());
        promoGetResponse.setDiscount(String.valueOf(promotion.getDiscount()));
        return promoGetResponse;
    }
}
