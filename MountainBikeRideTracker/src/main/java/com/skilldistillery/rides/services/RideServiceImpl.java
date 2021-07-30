package com.skilldistillery.rides.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rides.entities.Ride;
import com.skilldistillery.rides.repositories.RideRepository;

@Service
public class RideServiceImpl implements RideService{
	
	@Autowired
	RideRepository repo;

	@Override
	public List<Ride> allRides() {
		return repo.findAll();
	}

	@Override
	public Ride findById(Integer rideId) {
		Optional<Ride> rideO = repo.findById(rideId);
		Ride ride = rideO.get();
		return ride;
	}

	@Override
	public boolean delete(Ride ride) {
		repo.delete(ride);
		return repo.existsById(ride.getId()) ? true : false;
	}

	@Override
	public Ride create(Ride ride) {
		return repo.save(ride);
	}

	@Override
	public Ride update(Ride ride) {
		return repo.saveAndFlush(ride);
	}

}
