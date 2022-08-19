import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandService } from '../command.service';
import { ParkingService } from '../services/parking.service';
import { StatusParking } from '../variable';
import { mockParks } from '../mock';

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

  constructor(
    private route: Router,
    private parkingService: ParkingService,
    private commandService: CommandService
  ) {}

  ngOnInit(): void {
    this.parkingService.getParks().subscribe({
      next: (parks) => {
        if (parks.length) {
          this.parks = parks;
        } else {
          this.parks = mockParks;
        }
      },
      error: (err) => (this.parks = mockParks),
    });

    this.commandService.commandMessage.subscribe((socketParkingObj) => {
      console.log(
        'response from websocket: ',
        socketParkingObj,
        typeof socketParkingObj
      );

      const findParkingIndex = this.parks.findIndex(
        (park) => park.id === socketParkingObj.id
      );

      this.parks.splice(findParkingIndex, 1, socketParkingObj);

      console.log('updated parks', this.parks);
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
    const park = this.parks.find((park) => park.id === id);

    if (park?.reservable) {
      return alert('ช่องสำหรับผู้ที่เป็นสมาชิกเท่านั้น');
    }

    const updatedPark = {
      ...park!,
      status:
        park!.status === ParkingLotStatus.Available
          ? ParkingLotStatus.Occupied
          : ParkingLotStatus.Available,
    };
    console.log('updated park', updatedPark);

    const index = this.parks.findIndex((park) => park.id === updatedPark.id);

    this.parks[index].status = updatedPark.status;

    this.parkingService.updatePark(updatedPark).subscribe(() => {});

    this.commandService.commandMessage.next(updatedPark);
  }

  goMobile() {
    this.route.navigate(['Mobile']);
  }
}
