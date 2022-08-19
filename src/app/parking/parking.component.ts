import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandService } from '../command.service';
import { ParkingService } from '../services/parking.service';
import { StatusParking } from '../variable';

enum ParkingLotStatus {
  Available = 1,
  Occupied = 2,
  Reserved = 3,
}

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit {
  parks: StatusParking[] = [];

  constructor(private route: Router, private parkingService: ParkingService, private commandService: CommandService) {}

  ngOnInit(): void {
    this.parkingService.getParks().subscribe((parks) => {
      this.parks = parks;
    });

    this.commandService.commandMessage.subscribe((socketParkingObj) => {
      console.log("response from websocket: ", socketParkingObj, typeof(socketParkingObj));

      const findParkingIndex = this.parks.findIndex(park => park.id === socketParkingObj.id);

      this.parks.splice(findParkingIndex, 1, socketParkingObj)

      console.log("updated parks",this.parks);
    });
  }

  parkingLotStatus(park: StatusParking) {
    if (park.reservable && park.status === ParkingLotStatus.Available) {
      return 'Reserved';
    }

    if (park.status === ParkingLotStatus.Occupied) {
      return 'Occupied';
    }

    return 'Available';
  }

  updateDisplay(id: number) {

    // send data to websocket
    // const mockUpdatedPark: StatusParking = {
    //   id: 1,
    //   floor: "A",
    //   lot_id: "A001",
    //   reservable: false,
    //   licenseplate: "",
    //   status: 2
    // }

    const park = this.parks.find((park) => park.id === id);
    // const park = this.parks.find((park) => park.id === id)|| mockUpdatedPark;

    if (park?.reservable) {
      return alert('ช่องสำหรับผู้ที่เป็นสมาชิกเท่านั้น');
    }
    
    const updatedPark = {
      ...park!,
      status: park!.status === 1 ? 2 : 1,
    };
    console.log("updated park", updatedPark);

    this.parkingService.updatePark(updatedPark).subscribe((res) => {
      const index = this.parks.findIndex((park) => park.id === res.id);

      this.parks[index].status = res.status;
    });

    this.commandService.commandMessage.next(updatedPark);
  }

  goMobile() {
    this.route.navigate(['Mobile']);
  }
}
