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

  Updatetoreserve(id: number, licens: string, lot: string) {

    if (licens.length === 0){
      this.message = "ไม่มีเลขทะเบียน"
      return }


    const park = this.parks.find((park) => park.id === id);
    if (park?.status === ParkingLotStatus.Reserved) {

    } else{  if (licens !== park?.licenseplate){
      this.message = "ไม่สามารถยกเลิกการจองได้ เพราะไม่ใช่เลขทะเบียนของท่าน"
      return }}

    const updatedPark = {
      ...park,

      status: park?.status === ParkingLotStatus.Available ? ParkingLotStatus.Reserved : ParkingLotStatus.Available,
      licenseplate: licens

    };

updatedPark.status === ParkingLotStatus.Reserved ? this.message = "ทะเบียน " + licens + " ยกเลิกการจองที่จอดหมายเลข " + lot  + " สำเร็จ" : this.message = "ทะเบียน " + licens + " จองที่จอดหมายเลข " + lot  + " สำเร็จ"
this.parkingService.updatePark(updatedPark).subscribe((res) => {
  const index = this.parks.findIndex((park) => park.id === res.id);

  this.parks[index].status = res.status;
  this.parks[index].licenseplate = res.licenseplate;
});


    updatedPark.status === ParkingLotStatus.Reserved
      ? (this.message =
          'ทะเบียน ' + licens + ' ยกเลิกการจองที่จอดหมายเลข ' + lot + ' สำเร็จ')
      : (this.message =
          'ทะเบียน ' + licens + ' จองที่จอดหมายเลข ' + lot + ' สำเร็จ');
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
