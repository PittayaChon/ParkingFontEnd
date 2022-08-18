import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { park as parkMock, reserve } from '../mock';
import { ParkingService } from '../services/parking.service';
import { StatusParking } from '../variable';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit {
  parks: StatusParking[] = [];
  NP1 = '';
  NP2 = '';
  NP3 = '';
  NP4 = '';
  NP5 = '';
  NP6 = '';
  NP7 = '';
  NP8 = '';
  NP9 = '';
  NP10 = '';
  statusfrontend: any = [
    { status01: '' },
    { status02: '' },
    { status03: '' },
    { status04: '' },
    { status05: '' },
    { status06: '' },
    { status07: '' },
    { status08: '' },
    { status09: '' },
    { status010: '' },
  ];

  constructor(private route: Router, private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.parkingService.getParks().subscribe((parks) => {
      this.parks = parks;

      for (let i = 0; i < this.parks.length; i++) {
        let startIndex = i + 1;
        var lot_id = 'A0';

        lot_id =
          startIndex > 9 ? `${lot_id}${startIndex}` : `${lot_id}0${startIndex}`;
        const index = this.parks.findIndex((item) => item.lot_id === lot_id);
        if (this.parks[index].status === 1) {
          this.statusfrontend[i] = 'Available';
        }
        if (this.parks[index].status === 2) {
          this.statusfrontend[i] = 'Occupied';
        }
        if (this.parks[index].status === 3) {
          this.statusfrontend[i] = 'Reserved';
        }
      }

      this.NP1 = this.statusfrontend[0];
      this.NP2 = this.statusfrontend[1];
      this.NP3 = this.statusfrontend[2];
      this.NP4 = this.statusfrontend[3];
      this.NP5 = this.statusfrontend[4];
      this.NP6 = this.statusfrontend[5];
      this.NP7 = this.statusfrontend[6];
      this.NP8 = this.statusfrontend[7];
      this.NP9 = this.statusfrontend[8];
      this.NP10 = this.statusfrontend[9];
    });
  }

  updateDisplay(lot_id: string) {
    const park = this.parks.find((item) => item.lot_id === lot_id);

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
