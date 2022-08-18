import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { park as parkMock, reserve } from '../mock';
import { ParkingService } from '../services/parking.service';
import { StatusParking } from '../variable';

enum Status {
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

  constructor(private route: Router, private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.parkingService.getParks().subscribe((parks) => {
      this.parks = parks;
    });
  }

  parkingLotStatus(park: StatusParking) {
    if (park.reservable && park.status === Status.Available) {
      return 'Reserved';
    }

    if (park.status === Status.Occupied) {
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
      ...park,
      status: park?.status === 1 ? 2 : 1,
    };

    this.parkingService.updatePark(updatedPark).subscribe((res) => {
      const index = this.parks.findIndex((park) => park.id === res.id);

      this.parks[index].status = res.status;
    });
  }

  updateDisplayReserve(value: string) {
    const index = parkMock.findIndex((item) => item.lot_id === value);

    const index2 = reserve.findIndex((item) => item.lot_id === value);
    console.log(value);
    console.log(reserve[index2].status);
    if (parkMock[index].status == 1) {
      reserve[index2].status = 1;
    } else {
      if (parkMock[index].status == 0) {
        reserve[index2].status = 0;
      }
    }
    console.log(reserve[index2]);

    this.ngOnInit();
  }

  goMobile() {
    this.route.navigate(['Mobile']);
  }
}
