package com.skilldistillery.rides.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rides.entities.Ride;

public interface RideRepository extends JpaRepository<Ride, Integer>{

}
