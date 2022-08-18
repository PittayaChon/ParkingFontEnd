import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { park, reserve } from '../mock';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
  datafordisplayreserve = reserve;
  message = ''
  NP1 = '';
  NP2 = '';
  NP3 = '';
  formg = new FormGroup({
    lot_id: new FormControl(),
    licenseplate: new FormControl(),
    status: new FormControl(),
  });
  statusfrontend: any = this.datafordisplayreserve;
  constructor(private location: Location) {}
  goback() {
    this.location.back();
  }

  Updatetoreserve(value: string, licen: string, s: string) {
    if (s === 'Available') {
      this.formg.patchValue({ status: 2 });
      this.formg.patchValue({ lot_id: value });
      this.formg.patchValue({ licenseplate: licen });
      console.log(s);
      console.log(this.formg.value);
      this.mockapiupdate(value, 2);
      return;
    }
    if (s === 'Reserved') {
      this.formg.patchValue({ status: 0 });
      this.formg.patchValue({ lot_id: value });
      this.formg.patchValue({ licenseplate: licen });
      console.log(s);
      console.log(this.formg.value);
      this.mockapiupdate(value, 0);
    }
  }

  mockapiupdate(value: string, status: number) {
    // apiupdate
    const index = reserve.findIndex((item) => item.lot_id === value);
    console.log(reserve[index].status);
    reserve[index] = this.formg.value;
    const index2 = park.findIndex((item) => item.lot_id === value);
    park[index2].status = status;
    this.ngOnInit();
    console.log(reserve[index]);
  }
  ngOnInit(): void {
    this.statusfrontend = this.datafordisplayreserve;
    for (let i = 8; i <= 10; i++) {
      if (i < 10) {
        var value = 'A00' + String(i);
      } else {
        var value = 'A010';
      }
      const index = this.datafordisplayreserve.findIndex(
        (item) => item.lot_id === value
      );
      if (this.datafordisplayreserve[index].status === 0) {
        this.statusfrontend[i - 8].status = 'Available';
      }
      if (this.datafordisplayreserve[index].status === 1) {
        this.statusfrontend[i - 8].status = 'Occupied';
      }
      if (this.datafordisplayreserve[index].status === 2) {
        this.statusfrontend[i - 8].status = 'Reserved';
      }
    }
    this.NP1 = this.statusfrontend[0];
    this.NP2 = this.statusfrontend[1];
    this.NP3 = this.statusfrontend[2];
  }
}
