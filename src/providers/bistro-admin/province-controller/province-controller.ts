import { Injectable } from '@angular/core';
import { Province } from "../classes/province";
import { Subject } from 'rxjs/Subject';
import { Utils } from '../../app-utils';
@Injectable()
export class ProvinceControllerProvider {
  provinces: Array<Province> = [];
  private provinceSubject = new Subject<Array<Province>>();
  private dataChange = this.provinceSubject.asObservable();

  constructor() {
  }

  updateData(data) {
    this.resetData();
    if (data && data.length) {
      for (let province of data) {
        let temProvince = new Province(+province["id"], province["name"]);
        this.provinces.push(temProvince);
      }
      this.broadcastChange(this.provinces);
    }
  }

  broadcastChange(data) {
    this.provinceSubject.next(data); 
  }

  resetData() {
    this.provinces = [];
  }

  getAllCategories(): Array<Province> {
    return this.provinces;
  }

  getProvinceByName(name: string) {
    let index = this.provinces.findIndex(elm => {
      return Utils.bodauTiengViet(elm.title.toLowerCase()) == Utils.bodauTiengViet(name.toLowerCase());
    })
    if (index > -1) {
      return this.provinces[index];
    } else {
      return new Province(0, name);
    }

  }

}
