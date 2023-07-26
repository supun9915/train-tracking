package com.tracker.tracker.services.impl;

import com.tracker.tracker.auth.UserDetailServiceImpl;
import com.tracker.tracker.auth.UserDetailsImpl;
import com.tracker.tracker.models.entities.Booking;
import com.tracker.tracker.models.entities.Reservation;
import com.tracker.tracker.models.entities.Users;
import com.tracker.tracker.models.request.DeleteRequest;
import com.tracker.tracker.models.request.BookingCreate;
import com.tracker.tracker.models.response.BookingGetResponse;
import com.tracker.tracker.models.response.BookingResponse;
import com.tracker.tracker.repositories.*;
import com.tracker.tracker.repositories.BookingRepository;
import com.tracker.tracker.services.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BookingService implements IBookingService {
    private final UserRepository usersRepository;
    private final BookingRepository bookingRepository;
    private final UserDetailServiceImpl userDetailsService;
    private final ReservationRepository reservationRepository;
    @Override
    public BookingResponse bookingCreate(BookingCreate bookingRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();

        Booking newBooking =new Booking();

        Reservation reservation = new Reservation();
        reservation.setSeatNumber(bookingRequest.getReservation().getSeatNumber());
        reservation.setTrainClass(bookingRequest.getReservation().getTrainClass());
        reservation.setCreatedBy(user);
        reservation.setCreatedTime(OffsetDateTime.now());

        newBooking.setReservation(reservation);
        newBooking.setCreatedBy(user);
        newBooking.setCreatedTime(OffsetDateTime.now());
        newBooking.setModifiedTime(OffsetDateTime.now());
        return BookingResponseConvertor(bookingRepository.save(newBooking));
    }


    @Override
    public BookingResponse updateBooking(UUID id, BookingCreate createBooking, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Booking updateBooking = bookingRepository.findById(id).get();
        
        updateBooking.setModifiedBy(user);
        updateBooking.setModifiedTime(OffsetDateTime.now());
        return BookingResponseConvertor(bookingRepository.save(updateBooking));
    }

    @Override
    public List<BookingGetResponse> getBooking(UUID bookingId) {
        List<BookingGetResponse> bookingGetResponses = new ArrayList<>();
        {
            if (bookingRepository.findAll().size()>0) {
                bookingGetResponses.add(bookingGetResponsesConverter(bookingRepository.findById(bookingId).get()));
            }
        }
        return bookingGetResponses;
    }

    @Override
    public List<BookingGetResponse> getAllBooking() {
        List<BookingGetResponse> bookingGetResponses = new ArrayList<>();

        for (Booking booking :
                bookingRepository.findByDeletedOrderByCreatedTimeDesc(false)) {
            bookingGetResponses.add(bookingGetResponsesConverter(booking));
        }
        return bookingGetResponses;
    }

    @Override
    public BookingResponse deleteBooking(DeleteRequest deleteRequest, Principal principal) {
        UserDetailsImpl userImpl = (UserDetailsImpl) userDetailsService.loadUserByUsername(principal.getName());
        Users user = usersRepository.findById(userImpl.getId()).get();
        Booking DeleBooking =
                bookingRepository.findById(UUID.fromString(deleteRequest.getId())).get();
        DeleBooking .setDeleted(deleteRequest.getDelete());
        DeleBooking .setModifiedBy(user);
        DeleBooking .setModifiedTime(OffsetDateTime.now());

        return BookingResponseConvertor(bookingRepository.save(DeleBooking));
    }

    private BookingGetResponse bookingGetResponsesConverter(Booking booking) {
        BookingGetResponse bookingGetResponse = new BookingGetResponse();
        bookingGetResponse.setId(booking.getId());
        

        return bookingGetResponse;
    }

    private BookingResponse BookingResponseConvertor(Booking booking) {
        BookingResponse bookingGetResponse = new BookingResponse();
        bookingGetResponse.setId(booking.getId());
        return bookingGetResponse;
    }
}
