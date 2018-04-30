import { Injectable } from '@angular/core';
import { Map } from "../classes/map";

import { Subject } from 'rxjs/Subject';
@Injectable()
export class MapControllerProvider {
  maps: Array<Map> = [];
  private mapSubject = new Subject<Array<Map>>();
  public dataChange = this.mapSubject.asObservable();

  constructor() { 
  } 
}
