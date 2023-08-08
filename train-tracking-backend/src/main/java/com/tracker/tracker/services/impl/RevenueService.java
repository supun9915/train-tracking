package com.tracker.tracker.services.impl;

import com.tracker.tracker.models.entities.Booking;
import com.tracker.tracker.models.entities.Payment;
import com.tracker.tracker.models.entities.Schedule;
import com.tracker.tracker.models.entities.Train;
import com.tracker.tracker.models.response.FirstClassRevenueResponse;
import com.tracker.tracker.models.response.RevenueResponse;
import com.tracker.tracker.models.response.SecondClassRevenueResponse;
import com.tracker.tracker.models.response.ThirdClassRevenueResponse;
import com.tracker.tracker.repositories.*;
import com.tracker.tracker.services.IRevenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RevenueService implements IRevenueService {
    private final TrainRepository trainRepository;
    private final ScheduleRepository scheduleRepository;
    private final BookingRepository bookingRepository;

    public RevenueResponse getTotalRevenue(String trainName) {
        // The train name acts as a unique identifier for each train.
        // 1. Get the train that has the provided train name
        Train train = trainRepository.findByName(trainName).get();

        // 2. Get all  the schedule records for that train's ID
        List<Schedule> schedules = scheduleRepository.findAllByTrain(train);

        // 3. Get the booking ID whose records contain that schedule ID
        // There is a 1 to 1 mapping between booking and schedule. I have to get each booking for each schedule
        List<Booking> bookings = new ArrayList<>();
        schedules.forEach(schedule -> {
            bookings.add(bookingRepository.findBySchedule(schedule).get());
        });

        // 4. From the booking ID, get the payment ID
        // Each booking has a payment associated with it.... add each payment into the payments array list
        List<Payment> payments = new ArrayList<>();
        bookings.forEach(booking -> {
            payments.add(booking.getPayment());
        });

        // 5. From the payment ID, get the total amount paid for that payment
        double total = 0;
        for (Payment payment : payments) {
            total += payment.getTotal();
        }

        return null;
    }

    @Override
    public RevenueResponse getRevenueOverview(String trainName) throws IllegalStateException {
        // 1. Get all the schedules for the train
        if (!trainRepository.findByName(trainName).isPresent()) {
            throw new IllegalStateException(String.format("Train name does not exist: %s", trainName));
        }
        Train train = trainRepository.findByName(trainName).get();
        List<Schedule> schedules = scheduleRepository.findAllByTrain(train);

        // 2.For each schedule, get all the bookings and categorize the bookings based on the seat class
        List<Booking> firstClassBookings = new ArrayList<>();
        List<Booking> secondClassBookings = new ArrayList<>();
        List<Booking> thirdClassBookings = new ArrayList<>();

// UNCOMMENT THIS:
//        for (Schedule schedule : schedules) {
//            if(!bookingRepository.findBySchedule(schedule).isPresent()) {
//                throw new IllegalStateException("Booking not found");
//            }
//            Booking booking = bookingRepository.findBySchedule(schedule).get();
//
//            // 2.1 Categorize the bookings
//            String seatClass = booking.getReservation().getTrainClass();
//            if(seatClass.equalsIgnoreCase("first")) {
//                firstClassBookings.add(booking);
//            }
//            else if(seatClass.equalsIgnoreCase("second")) {
//                secondClassBookings.add(booking);
//            }
//            else if(seatClass.equalsIgnoreCase("third")) {
//                thirdClassBookings.add(booking);
//            }
//            else {
//                throw new IllegalStateException(String.format("Invalid seat class: %s", seatClass));
//            }
//        }

        // 3. Calculate revenue data
        // 3.1 First class bookings
        double firstClassTotalRevenue = 0;
        for (Booking firstClassBooking : firstClassBookings) {
            firstClassTotalRevenue += firstClassBooking.getPayment().getTotal();
        }

        // 3.2 Second class bookings
        double secondClassTotalRevenue = 0;
        for (Booking secondClassBooking : secondClassBookings) {
            secondClassTotalRevenue += secondClassBooking.getPayment().getTotal();
        }

        // 3.3 Third class bookings
        double thirdClassTotalRevenue = 0;
        for (Booking thirdClassBooking : thirdClassBookings) {
            thirdClassTotalRevenue += thirdClassBooking.getPayment().getTotal();
        }

        // 4.  Generate the revenue response
        FirstClassRevenueResponse firstClassRevenue = FirstClassRevenueResponse.builder()
                .revenueProportion(87.3f)
                .averageSellingRate(16_000)
                .ticketsBooked(556)
                .ticketsSold(981)
                .total(9_000)
                .build();

        SecondClassRevenueResponse secondClassRevenue = SecondClassRevenueResponse.builder()
                .revenueProportion(34.0f)
                .averageSellingRate(1_130)
                .ticketsBooked(451)
                .ticketsSold(441)
                .total(12_000)
                .build();

        ThirdClassRevenueResponse thirdClassRevenue = ThirdClassRevenueResponse.builder()
                .revenueProportion(16.2f)
                .averageSellingRate(1_200)
                .ticketsBooked(134)
                .ticketsSold(123)
                .total(8_000)
                .build();

        RevenueResponse response = RevenueResponse.builder()
                .firstClassRevenueResponse(firstClassRevenue)
                .secondClassRevenueResponse(secondClassRevenue)
                .thirdClassRevenueResponse(thirdClassRevenue)
                .totalRevenue(firstClassTotalRevenue + secondClassTotalRevenue + thirdClassTotalRevenue)
                .build();

        return response;
    }
}
