import { APP_BASE_HREF } from '@angular/common';
import { TestBed ,ComponentFixture} from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';
import { ParkingComponent } from './parking/parking.component';

describe('AppComponent', () => {

  const routes: Routes = [
    { path: "", component: ParkingComponent },
    { path: "Mobile", component: MobileComponent }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        ParkingComponent,
        MobileComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  });

  it(`should have as title 'Parking Lot'`, async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Parking Lot');
  });

  // it(`should have as title 'frontend-parking'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('frontend-parking');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('frontend-parking app is running!');
  // });
});
