package com.skilldistillery.rides.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rides.entities.Ride;
import com.skilldistillery.rides.services.RideService;

@CrossOrigin({"*", "http://localhost:4202"})
@RequestMapping("api")
@RestController
public class RideController {

	@Autowired
	private RideService svc;
	
	@GetMapping("rides")
	public List<Ride> listRides() {
		return svc.allRides();
	}
	
	@GetMapping("rides/{rideId}")
	public Ride listRide(@PathVariable int rideId) {
		Ride ride = svc.findById(rideId);
		return ride;
	}
	
	@PostMapping("rides")
	public Ride createRide(@RequestBody Ride ride) {
		return svc.create(ride);
	}
	
	@PutMapping("rides")
	public Ride updateRide(@RequestBody Ride ride) {
		return svc.update(ride);
	}
	
	@DeleteMapping("rides/{rideId}")
	public void deleteRide(@PathVariable int rideId) {
		svc.delete(svc.findById(rideId));
	}
}
