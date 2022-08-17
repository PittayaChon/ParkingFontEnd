import { StatusParking } from "./variable";

export const park: StatusParking[] = [
  { NO_parking: "A001", licenseplate: '' ,status:0 , reserve:false , floor:'A' },
  { NO_parking: "A002", licenseplate: '' ,status:1 , reserve:false , floor:'A' },
  { NO_parking: "A003", licenseplate: '' ,status:0 , reserve:false , floor:'A' },
  { NO_parking: "A004", licenseplate: '' ,status:0 , reserve:false , floor:'A' },
  { NO_parking: "A005", licenseplate: '' ,status:0 , reserve:false , floor:'A' },
  { NO_parking: "A006", licenseplate: '' ,status:0 , reserve:false , floor:'A' },
  { NO_parking: "A007", licenseplate: '' ,status:0 , reserve:false , floor:'A' },
  { NO_parking: "A008", licenseplate: '' ,status:0 , reserve:true , floor:'A' },
  { NO_parking: "A009", licenseplate: '' ,status:0 , reserve:true , floor:'A' },
  { NO_parking: "A010", licenseplate: '' ,status:0 , reserve:true , floor:'A' },

];

export const reserve: StatusParking[] = [
  { NO_parking: "A008", licenseplate: '' ,status:0 , reserve:true , floor:'A' },
  { NO_parking: "A009", licenseplate: '' ,status:0 , reserve:true , floor:'A' },
  { NO_parking: "A010", licenseplate: '' ,status:0 , reserve:true , floor:'A' },

];
