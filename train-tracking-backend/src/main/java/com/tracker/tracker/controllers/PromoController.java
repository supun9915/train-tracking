package com.tracker.tracker.controllers;

import com.tracker.tracker.models.entities.Train;
import com.tracker.tracker.models.request.CreateTrain;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.response.PromoGetResponse;
import com.tracker.tracker.models.response.ScheduleResponse;
import com.tracker.tracker.models.response.TrainResponse;
import com.tracker.tracker.repositories.PromoRepository;
import com.tracker.tracker.services.IPromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/promo")
public class PromoController {
    private final IPromoService promoService;
    private final PromoRepository promoRepository;

    @PreAuthorize("hasAnyAuthority('Super Admin','Passenger')")
    @GetMapping("/findPromo")
    public ResponseEntity<?> getAllPromo(){
        return ResponseEntity.ok(promoService.getAllPrices());
    }

    @PreAuthorize("hasAnyAuthority('Super Admin')")
    @PatchMapping("/delete")
    public ResponseEntity<?> deleteSchedule(@RequestBody DeleteRequest deleteRequest, Principal principal) {
        PromoGetResponse scheduleResponse = promoService.deleteSchedule(deleteRequest, principal);
        return ResponseEntity.ok(scheduleResponse);
    }

    @PreAuthorize("hasAnyAuthority('Super Admin')")
    @PostMapping("/create")
    public ResponseEntity<?> createPromo(@Valid @RequestBody PromoGetResponse createPromo,
                                         Principal principal) {
        if (promoRepository.findByCode(createPromo.getCode())) {
            return new ResponseEntity<>("Promo Code already exits.", HttpStatus.BAD_REQUEST);
        } else {
            return ResponseEntity.ok(promoService.createPromo(createPromo, principal));
        }
    }

//    @PreAuthorize("hasAnyAuthority('Super Admin')")
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> updatePromo(@PathVariable UUID id,
//                                         @Valid @RequestBody CreateTrain createPromo,
//                                         Principal principal) {
//        Train train =trainRepository.findById(id).get();
//        if (train.getName().equals(createPromo.getName())){
//            TrainResponse savedTrain = trainService.updateTrain(id,createPromo,
//                    principal);
//            return ResponseEntity.ok(savedTrain);
//        }else {
//            if (trainRepository.findByName(createPromo.getName()).isPresent()) {
//                return new ResponseEntity<>("Train name already exits.", HttpStatus.BAD_REQUEST);
//            } else {
//                TrainResponse savedTrain = trainService.updateTrain(id, createPromo,
//                        principal);
//                return ResponseEntity.ok(savedTrain);
//            }
//        }
//    }

}
