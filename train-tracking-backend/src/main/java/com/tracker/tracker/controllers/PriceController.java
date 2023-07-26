package com.tracker.tracker.controllers;

import com.tracker.tracker.models.request.FindPriceRequest;
import com.tracker.tracker.services.IPriceService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/price")
public class PriceController {
  private IPriceService priceService;

  @PreAuthorize("hasAnyAuthority('Super Admin','Passenger')")
  @PostMapping("/findPrice")
  public ResponseEntity<?> findPrice(@RequestBody FindPriceRequest findPriceRequest){
    return ResponseEntity.ok(priceService.findPrice(findPriceRequest));
  }
}
