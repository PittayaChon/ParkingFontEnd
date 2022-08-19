import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ParkingComponent } from './parking.component';
import { StatusParking} from './../variable'
describe('ParkingComponent', () => {
  let component: ParkingComponent;
  let fixture: ComponentFixture<ParkingComponent>;
  let h1: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule], // <====
      declarations: [ ParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingComponent);
    component = fixture.debugElement.componentInstance;
    h1 = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();

  });

  it(`should have as status 'Parking Lot' is correct`, async() => {

    let reservedStatusParking : StatusParking = {
      status: 1,
      reservable: true,
      id: 1,
      licenseplate: "SA009",
      lot_id: "A001",
      floor: "2"
    }

    expect(component.parkingLotStatus(reservedStatusParking)).toEqual("Reserved")



    let OccupiedStatusParking : StatusParking = {
      status: 2,
      reservable: true,
      id: 1,
      licenseplate: "SA009",
      lot_id: "A001",
      floor: "2"
    }

    expect(component.parkingLotStatus(OccupiedStatusParking)).toEqual("Occupied")


    let DefaultStatusParking : StatusParking = {
      status: 3,
      reservable: true,
      id: 1,
      licenseplate: "SA009",
      lot_id: "A001",
      floor: "2"
    }

    expect(component.parkingLotStatus(DefaultStatusParking)).toEqual("Available")

  });



  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

