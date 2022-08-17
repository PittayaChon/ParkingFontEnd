import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  park, reserve } from '../mock';
import { StatusParking } from '../variable';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
data:StatusParking[] = park
NP1='' ; NP2='' ; NP3='' ; NP4='' ; NP5='' ; NP6='' ; NP7='' ; NP8='' ; NP9='' ; NP10=''
statusfrontend:any = [
  {status01:''},
  {status02:''},
  {status03:''},
  {status04:''},
  {status05:''},
  {status06:''},
  {status07:''},
  {status08:''},
  {status09:''},
  {status010:''},
]


 updateDisplay(value:string){

  const index = park.findIndex(item => item.NO_parking === value)
  console.log(value)
  console.log(park[index].status)
  if (park[index].status == 0) {park[index].status = 1}else{park[index].status = 0}
  console.log(park[index].status)
  this.ngOnInit()
 }

 updateDisplayReserve(value:string){
  const index = park.findIndex(item => item.NO_parking === value)
  console.log(value)
  console.log(park[index].status)
  if (park[index].status == 2) {park[index].status = 1}else{
    if(park[index].status == 1) {park[index].status = 0}}
  console.log(park[index].status)

  const index2 = reserve.findIndex(item => item.NO_parking === value)
  console.log(value)
  console.log(reserve[index2].status)
  if (park[index].status == 1) {reserve[index2].status = 1}else{
    if(park[index].status == 0) {reserve[index2].status = 0}}
  console.log(reserve[index2])

  this.ngOnInit()
 }

 goMobile(){
  this.route.navigate(['Mobile']);
 }
  constructor(private route:Router) {}

  ngOnInit(): void {

    for (let i = 1; i <= 10; i++) {
      if (i < 10 ){var value = "A00" + String(i)} else {var value = "A010"}
      const index = this.data.findIndex(item => item.NO_parking === value)
      if (this.data[index].status === 0){this.statusfrontend[i-1] = 'Available'}
      if (this.data[index].status === 1){this.statusfrontend[i-1] = 'Occupied'}
      if (this.data[index].status === 2){this.statusfrontend[i-1] = 'Reserled'}
    }
    this.NP1 = this.statusfrontend[0]
    this.NP2 = this.statusfrontend[1]
    this.NP3 = this.statusfrontend[2]
    this.NP4 = this.statusfrontend[3]
    this.NP5 = this.statusfrontend[4]
    this.NP6 = this.statusfrontend[5]
    this.NP7 = this.statusfrontend[6]
    this.NP8 = this.statusfrontend[7]
    this.NP9 = this.statusfrontend[8]
    this.NP10 = this.statusfrontend[9]
  }

}
