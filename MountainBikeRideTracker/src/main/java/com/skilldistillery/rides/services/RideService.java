package com.skilldistillery.rides.services;

import java.util.List;

import com.skilldistillery.rides.entities.Ride;

public interface RideService {
	
	List<Ride> allRides();
	Ride findById(Integer rideId);
	boolean delete(Ride ride);
	Ride create(Ride ride);
	Ride update(Ride ride);

}
