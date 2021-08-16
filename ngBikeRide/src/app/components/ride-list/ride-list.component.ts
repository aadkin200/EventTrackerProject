import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {

  rides: Ride[] | null = []
  newRide = new Ride();
  selected: Ride | null = null;
  editRide: Ride | null = null;
  ridesDiv = true;
  createRideBool = false;
  editRideBool = false;

  constructor(
    private rideService: RideService
  ) { }

  ngOnInit(): void {
    this.loadRide();
  }

  loadRide() {
    this.rideService.index().subscribe(
      rides => {
        this.rides = rides;
      },
      noRides => {
        console.error('rideListComponent Error');
        console.error(noRides);
      }
    );
  }

  addRide(): void {
    this.rideService.create(this.newRide).subscribe(
      data => {
        this.loadRide();
      },
      error => {
        console.log(error);
        console.log("error");
      }
    );
    this.newRide = new Ride();
    this.createRideBool = false;
    this.ridesDiv = true;
  }

  updateRide(ride: Ride) {
    this.rideService.update(ride).subscribe(
      data => {
        this.loadRide();
      },
      error => {
        console.log(console.error())
        console.log("error updating through service");
      }
    );
    this.editRide = null;
    this.selected = null;
    this.ridesDiv = true;
  }

  deleteRide(id: number) {
    this.rideService.destroy(id).subscribe(
      data => {
        this.loadRide();
      },
      error => {
        console.log(error);
        console.log("error deleting through service");
      }
    );
  }

  setEditRide(ride: any): void {
    console.log(ride);
    this.editRide = ride;
    console.log(this.editRide);
    this.editRideBool = true;
    this.ridesDiv = false;
  }

  createRide() {
    this.ridesDiv = false;
    this.createRideBool = true;
  }



}
