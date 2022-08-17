import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile/mobile.component';
import { ParkingComponent } from './parking/parking.component';

const routes: Routes = [{path: "" , component: ParkingComponent},
{path:"Mobile" ,component:MobileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
