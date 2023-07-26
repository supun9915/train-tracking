package com.tracker.tracker.services.impl;

import com.tracker.tracker.auth.UserDetailServiceImpl;
import com.tracker.tracker.auth.UserDetailsImpl;
import com.tracker.tracker.models.entities.Payment;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.request.PaymentCreate;
import com.tracker.tracker.models.response.PaymentGetResponse;
import com.tracker.tracker.models.response.PaymentResponse;
import com.tracker.tracker.repositories.PaymentRepository;
import com.tracker.tracker.repositories.UserRepository;
import com.tracker.tracker.services.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PaymentService implements IPaymentService {
    private final UserRepository usersRepository;
    private final PaymentRepository paymentRepository;
    private final UserDetailServiceImpl userDetailsService;

    @Override
    public PaymentResponse paymentCreate(PaymentCreate paymentRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();

        Payment newPayment =new Payment();
        newPayment.setMethod(paymentRequest.getMethod());
        newPayment.setTotal(paymentRequest.getTotal());
        newPayment.setCreatedBy(user);
        newPayment.setCreatedTime(OffsetDateTime.now());
        newPayment.setModifiedTime(OffsetDateTime.now());
        return PaymentResponseConvertor(paymentRepository.save(newPayment));
    }


    @Override
    public PaymentResponse updatePayment(UUID id, PaymentCreate createPayment, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Payment updatePayment = paymentRepository.findById(id).get();
        updatePayment.setMethod(createPayment.getMethod());
        updatePayment.setTotal(createPayment.getTotal());
        updatePayment.setModifiedBy(user);
        updatePayment.setModifiedTime(OffsetDateTime.now());
        return PaymentResponseConvertor(paymentRepository.save(updatePayment));
    }

    @Override
    public List<PaymentGetResponse> getPayment(UUID paymentId) {
        List<PaymentGetResponse> paymentGetResponses = new ArrayList<>();
        {
            if (paymentRepository.findAll().size()>0) {
                paymentGetResponses.add(paymentGetResponsesConverter(paymentRepository.findById(paymentId).get()));
            }
        }
        return paymentGetResponses;
    }

    @Override
    public List<PaymentGetResponse> getAllPayment() {
        List<PaymentGetResponse> paymentGetResponses = new ArrayList<>();

        for (Payment payment :
                paymentRepository.findByDeletedOrderByCreatedTimeDesc(false)) {
            paymentGetResponses.add(paymentGetResponsesConverter(payment));
        }
        return paymentGetResponses;
    }

    @Override
    public PaymentResponse deletePayment(DeleteRequest deleteRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Payment DelePayment =
                paymentRepository.findById(UUID.fromString(deleteRequest.getId())).get();
        DelePayment .setDeleted(deleteRequest.getDelete());
        DelePayment .setModifiedBy(user);
        DelePayment .setModifiedTime(OffsetDateTime.now());

        return PaymentResponseConvertor(paymentRepository.save(DelePayment));
    }

    private PaymentGetResponse paymentGetResponsesConverter(Payment payment) {
        PaymentGetResponse stationGetResponse = new PaymentGetResponse();
        stationGetResponse.setId(payment.getId());
        stationGetResponse.setMethod(payment.getMethod());
        stationGetResponse.setTotal(payment.getTotal());

        return stationGetResponse;
    }

    private PaymentResponse PaymentResponseConvertor(Payment payment) {
        PaymentResponse stationGetResponse = new PaymentResponse();
        stationGetResponse.setId(payment.getId());
        return stationGetResponse;
    }
}
