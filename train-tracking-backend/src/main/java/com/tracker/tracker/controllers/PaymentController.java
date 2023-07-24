package com.tracker.tracker.controllers;

import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.request.PaymentCreate;
import com.tracker.tracker.models.response.PaymentResponse;
import com.tracker.tracker.services.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    private final IPaymentService paymentService;

    @PreAuthorize("hasAnyAuthority('Super Admin')")
    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@Valid @RequestBody PaymentCreate paymentRequest,
                                               Principal principal) {
        return ResponseEntity.ok(paymentService.paymentCreate(paymentRequest, principal));
    }

    @PreAuthorize("hasAnyAuthority('Super Admin')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePayment(@PathVariable UUID id, @Valid @RequestBody PaymentCreate paymentRequest,
                                               Principal principal) {
        PaymentResponse savedPayment = paymentService.updatePayment(id, paymentRequest, principal);
        return ResponseEntity.ok(savedPayment);
    }

    @PreAuthorize("hasAnyAuthority('Super Admin')")
    @GetMapping("/getupayment")
    public ResponseEntity<?> getAllPayment(@RequestParam(value = "paymentId", required = false)UUID paymentId){
        if (paymentId != null) {
            return ResponseEntity.ok(paymentService.getPayment(paymentId));
        } else {
            return ResponseEntity.ok(paymentService.getAllPayment());
        }
    }

    @PreAuthorize("hasAnyAuthority('Super Admin')")
    @PatchMapping("/delete")
    public ResponseEntity<?> deletePayment(@RequestBody DeleteRequest deleteRequest, Principal principal) {
        PaymentResponse paymentResponse = paymentService.deletePayment(deleteRequest, principal);
        return ResponseEntity.ok(paymentResponse);
    }
}
