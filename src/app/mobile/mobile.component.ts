import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParkingService } from '../services/parking.service';
import { StatusParking } from '../variable';
enum ParkingLotStatus {
  Available = 1,
  Occupied = 2,
  Reserved = 3,
}
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
  message = '';

  formg = new FormGroup({
    id: new FormControl(),
    lot_id: new FormControl(),
    licenseplate: new FormControl(),
    status: new FormControl(),
    reservable: new FormControl(),
    floor: new FormControl(),
  });
  parks: StatusParking[] = [];

  constructor(
    private route: Router,
    private parkingService: ParkingService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.message = '';

    this.parkingService.getParks().subscribe((parks) => {
      this.parks = parks;
    });
  }

  deletemsg() {
    this.message = '';
  }
  goback() {
    this.location.back();
  }

  Updatetoreserve(id: number, licen: string, lot: string) {
    const park = this.parks.find((park) => park.id === id);

    const updatedPark = {
      ...park,
      status:
        park?.status === ParkingLotStatus.Available
          ? ParkingLotStatus.Reserved
          : ParkingLotStatus.Available,
      licenseplate: licen,
    };

    updatedPark.status === ParkingLotStatus.Available
      ? (this.message =
          'ทะเบียน ' + licen + ' ยกเลิกการจองที่จอดหมายเลข ' + lot + ' สำเร็จ')
      : (this.message =
          'ทะเบียน ' + licen + ' จองที่จอดหมายเลข ' + lot + ' สำเร็จ');
    this.parkingService.updatePark(updatedPark).subscribe((res) => {
      const index = this.parks.findIndex((park) => park.id === res.id);

      this.parks[index].status = res.status;
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
}
