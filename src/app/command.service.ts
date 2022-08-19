import { Injectable } from '@angular/core';
import {Subject, map} from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusParking } from './variable';
import { WebsocketService } from './websocket.service';


@Injectable({
  providedIn: 'root'
})
export class CommandService {
  WS_URL = environment.production ? 
        'ws://prod.sandbox-me.com:1234/ws' 
        : "ws://localhost:1234/ws";
  public commandMessage: Subject<StatusParking>;

  constructor(wsService: WebsocketService) {
    this.commandMessage = <Subject<StatusParking>>wsService.connect(this.WS_URL).pipe(
      map((response: MessageEvent): StatusParking => {
        let data = JSON.parse(response.data);
        return {
          id: data.id,
          lot_id: data.lot_id,
          licenseplate: data.licenseplate,
          status: data.status,
          reservable: data.reservable,
          floor: data.floor
        };
      }
    ));
  }
}
